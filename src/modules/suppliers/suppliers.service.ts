import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier, SupplierDocument } from './entities/suppliers.schema';
import { CreateSupplierInput } from './dto/suppliers.input';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>,
  ) {}

  async create(createSupplierInput: CreateSupplierInput): Promise<Supplier> {
    const existing = await this.supplierModel.findOne({ phone: createSupplierInput.phone });
    if (existing) throw new ConflictException('Supplier with this phone number already exists');

    const lastSupplier = await this.supplierModel.findOne().sort({ supplierId: -1 }).lean();
    const nextId = lastSupplier?.supplierId ? lastSupplier.supplierId + 1 : 2001;

    const createdSupplier = new this.supplierModel({
      ...createSupplierInput,
      supplierId: nextId,
      createdAt: new Date(),
    });

    return createdSupplier.save();
  }

  async updateBySupplierId(supplierId: number, updateData: Partial<Supplier>): Promise<Supplier | null> {
    if (updateData.phone) {
      const exists = await this.supplierModel.findOne({
        phone: updateData.phone,
        supplierId: { $ne: supplierId }
      });
      if (exists) throw new Error("Phone already in use by another supplier");
    }
    return this.supplierModel.findOneAndUpdate({ supplierId }, { $set: updateData }, { new: true }).exec();
  }

  async removeBySupplierId(supplierId: number): Promise<Supplier | null> {
    return this.supplierModel.findOneAndDelete({ supplierId }).exec();
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierModel.find().lean();
  }

  async findPaginated(
  page: number,
  limit: number,
  search?: string,
  status?: string,
  sortBy: string = 'createdAt',
  startDate?: string,
  endDate?: string,
  sortOrder: 'asc' | 'desc' = 'desc',
): Promise<{ data: Supplier[]; total: number }> {
  const filter: any = {};

  if (search) {
    const terms = search.split(" ").filter(Boolean);
    filter.$and = terms.map(term => ({
      $or: [
        { name: { $regex: `.*${term}.*`, $options: 'i' } },
        { phone: { $regex: `.*${term}.*`, $options: 'i' } },
        { balance: { $regex: `.*${term}.*`, $options: 'i' } },
        { status: { $regex: `.*${term}.*`, $options: 'i' } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$supplierId" },
              regex: `.*${term}.*`,
              options: "i"
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "+05:00" } },
              regex: `.*${term}.*`,
              options: "i"
            }
          }
        }
      ]
    }));
  }

  if (startDate) {
    filter.createdAt = {};
    const start = new Date(startDate);
    filter.createdAt.$gte = start;
  }
  if (endDate) {
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);
    filter.createdAt.$lt = end;
  }

  if (status) {
    filter.status = status;
  }

  const sort: any = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const data = await this.supplierModel
    .find(filter)
    .sort(sort)
    .hint({ [sortBy]: 1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
    .exec();

  const total = await this.supplierModel.countDocuments(filter);

  return { data, total };
}


  async findByPhone(phone: string): Promise<Supplier | null> {
    return this.supplierModel.findOne({ phone }).exec();
  }
}
