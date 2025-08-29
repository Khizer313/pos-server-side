import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from './entities/sales.schema';
import { CreateSaleInput, UpdateSaleInput } from './dto/sales.input';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
  ) {}

  // ✅ Create new sale
  async create(createSaleInput: CreateSaleInput): Promise<Sale> {
    const lastSale = await this.saleModel.findOne().sort({ saleId: -1 }).lean();

    const nextId = lastSale?.saleId ? lastSale.saleId + 1 : 1001;

    const nextInvoiceNo = `${nextId}`;

    const createdSale = new this.saleModel({
      ...createSaleInput,
      saleId: nextId,
      invoiceNo: nextInvoiceNo, // ✅ always backend generated
      createdAt: new Date(),
    });

    return createdSale.save();
  }

  // ✅ Update sale by saleId
  async updateBySaleId(
    saleId: number,
    updateData: UpdateSaleInput,
  ): Promise<Sale | null> {
    return this.saleModel.findOneAndUpdate(
      { saleId },
      { $set: updateData },
      { new: true },
    ).exec();
  }

  // ✅ Delete sale by saleId
  async removeBySaleId(saleId: number): Promise<Sale | null> {
    return this.saleModel.findOneAndDelete({ saleId }).exec();
  }

  // ✅ Find all sales
  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().lean();
  }

  // ✅ Find sale by ID
  async findBySaleId(saleId: number): Promise<Sale | null> {
    return this.saleModel.findOne({ saleId }).lean();
  }

  // ✅ Paginated sales
  // ✅ Paginated sales with full search + filtering
async findPaginated(
  page: number,
  limit: number,
  search?: string,
  status?: string,
  startDate?: string,
  endDate?: string,
  paymentMethod?: string,
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc',
  filters?: { field: string; operator: string; value: string }[],
): Promise<{ data: Sale[]; total: number }> {
  const match: any = {};

  // 🔎 Search filter
  if (search) {
    const terms = search.split(" ").filter(Boolean);
    match.$and = terms.map(term => ({
      $or: [
        { invoiceNo: { $regex: term, $options: 'i' } },
        { status: { $regex: term, $options: 'i' } },
        { paymentMethod: { $regex: term, $options: 'i' } },
        { customerName: { $regex: term, $options: 'i' } },
        { "products.productName": { $regex: term, $options: 'i' } },
      ]
    }));
  }

  // 📅 Date range
  if (startDate || endDate) {
    match.createdAt = {};
    if (startDate) match.createdAt.$gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      match.createdAt.$lt = end;
    }
  }

  if (status) match.status = status;
  if (paymentMethod) match.paymentMethod = paymentMethod;

  // ✅ Apply dynamic filters (from DataGrid)
  filters?.forEach(f => {
    if (f.operator === "contains") {
      match[f.field] = { $regex: f.value, $options: "i" };
    } else if (f.operator === "equals") {
      match[f.field] = f.value;
    } else if (f.operator === "startsWith") {
      match[f.field] = { $regex: `^${f.value}`, $options: "i" };
    }
  });

  // ✅ Sorting
  const sort: any = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const [result] = await this.saleModel.aggregate([
    { $match: match },
    { $sort: sort },
    {
      $facet: {
        data: [
          { $skip: (page - 1) * limit },
          { $limit: limit },
        ],
        total: [
          { $count: "count" },
        ],
      },
    },
  ]);

  const data = result.data || [];
  const total = result.total[0]?.count || 0;

  return { data, total };
}



}
