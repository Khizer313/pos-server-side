import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand, BrandDocument } from './entities/brands.schema';
import { CreateBrandInput } from './dto/brands.input';
import { SortOrder } from 'mongoose'; // import this for type

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
  ) {}

  async create(createBrandInput: CreateBrandInput): Promise<Brand> {
    const existing = await this.brandModel.findOne({ name: createBrandInput.name });
    if (existing) {
      throw new ConflictException('Brand with this name already exists');
    }

    const lastBrand = await this.brandModel.findOne().sort({ brandId: -1 }).lean();
    const nextId = lastBrand?.brandId ? lastBrand.brandId + 1 : 1001;

    const createdBrand = new this.brandModel({
      ...createBrandInput,
      brandId: nextId,
      createdAt: new Date(),
    });
    return await createdBrand.save();
  }

  async updateByBrandId(brandId: number, updateData: Partial<Brand>): Promise<Brand | null> {
    return this.brandModel.findOneAndUpdate(
      { brandId },
      { $set: updateData },
      { new: true },
    ).exec();
  }

  async removeByBrandId(brandId: number): Promise<Brand | null> {
    return this.brandModel.findOneAndDelete({ brandId }).exec();
  }

  async findAll(): Promise<Brand[]> {
    return this.brandModel.find().lean();
  }


async findPaginated(
  page: number,
  limit: number,
  search?: string,
  status?: string,
  startDate?: string,
  endDate?: string,
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc',
): Promise<{ data: Brand[]; total: number }> {
  const filter: any = {};

  if (search) {
    const terms = search.split(" ").filter(Boolean);
    filter.$and = terms.map(term => ({
      $or: [
        { name: { $regex: `.*${term}.*`, $options: 'i' } },
        { status: { $regex: `.*${term}.*`, $options: 'i' } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$brandId" },
              regex: `.*${term}.*`,
              options: "i"
            }
          }
        },
        {
          $expr: {
            $regexMatch: {
              input: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
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
    if (!filter.createdAt) filter.createdAt = {};
    const end = new Date(endDate);
    end.setDate(end.getDate() + 1);
    filter.createdAt.$lt = end;
  }

  if (status) {
    filter.status = status;
  }

  // **Explicitly type cast here**
  const sort: { [key: string]: SortOrder } = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const data = await this.brandModel
    .find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
    .exec();

  const total = await this.brandModel.countDocuments(filter);

  return { data, total };
}

}
