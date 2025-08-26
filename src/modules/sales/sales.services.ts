import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from './entities/sales.schema';
import { CreateSaleInput } from './dto/sales.input';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
  ) {}

  // Create new sale
  async create(createSaleInput: CreateSaleInput): Promise<Sale> {
    const lastSale = await this.saleModel.findOne().sort({ saleId: -1 }).lean();
    const nextId = lastSale?.saleId ? lastSale.saleId + 1 : 1001;

    const createdSale = new this.saleModel({
      ...createSaleInput,
      saleId: nextId,
      createdAt: new Date(),
    });

    return createdSale.save();
  }

  // Update sale by saleId
  async updateBySaleId(saleId: number, updateData: Partial<Sale>): Promise<Sale | null> {
    return this.saleModel.findOneAndUpdate(
      { saleId },
      { $set: updateData },
      { new: true },
    ).exec();
  }

  // Delete sale by saleId
  async removeBySaleId(saleId: number): Promise<Sale | null> {
    return this.saleModel.findOneAndDelete({ saleId }).exec();
  }

  // Find all sales
  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().lean();
  }

  // Find sale by ID
  async findBySaleId(saleId: number): Promise<Sale | null> {
    return this.saleModel.findOne({ saleId }).lean();
  }

  // Paginated sales
  async findPaginated(
    page: number,
    limit: number,
    search?: string,
    status?: string,
    startDate?: string,
    endDate?: string,
    paymentMethod?: string,
  ): Promise<{ data: Sale[]; total: number }> {
    const filter: any = {};

    if (search) {
      const terms = search.split(' ').filter(Boolean);
      filter.$and = terms.map(term => ({
        $or: [
          { invoiceNo: { $regex: term, $options: 'i' } },
          { status: { $regex: term, $options: 'i' } },
          {
            $expr: {
              $regexMatch: { input: { $toString: '$saleId' }, regex: term, options: 'i' },
            },
          },
        ],
      }));
    }

    if (status) filter.status = status;
    if (paymentMethod) filter.paymentMethod = paymentMethod;

    if (startDate) {
      filter.createdAt = { ...filter.createdAt, $gte: new Date(startDate) };
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      filter.createdAt = { ...filter.createdAt, $lt: end };
    }

    const data = await this.saleModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await this.saleModel.countDocuments(filter);

    return { data, total };
  }
}
