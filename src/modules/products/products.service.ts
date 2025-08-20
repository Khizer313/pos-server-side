import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/products.schema';
import { CreateProductInput } from './dto/products.input';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const existing = await this.productModel.findOne({ name: createProductInput.name });
    if (existing) throw new ConflictException('Product with this name already exists');

    const last = await this.productModel.findOne().sort({ productId: -1 }).lean();
    const nextId = last?.productId ? last.productId + 1 : 2001;

    const created = new this.productModel({
      ...createProductInput,
      productId: nextId,
      createdAt: new Date(),
    });

    return created.save();
  }

  async updateByProductId(productId: number, updateData: Partial<Product>): Promise<Product | null> {
    return this.productModel.findOneAndUpdate({ productId }, { $set: updateData }, { new: true }).exec();
  }

  async removeByProductId(productId: number): Promise<Product | null> {
    return this.productModel.findOneAndDelete({ productId }).exec();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().lean();
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
  ): Promise<{ data: Product[]; total: number }> {
    const filter: any = {};

    if (search) {
      const terms = search.split(" ").filter(Boolean);
      filter.$and = terms.map(term => ({
        $or: [
          { name: { $regex: `.*${term}.*`, $options: 'i' } },
          { categoryAssigned: { $regex: `.*${term}.*`, $options: 'i' } },
          { status: { $regex: `.*${term}.*`, $options: 'i' } },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$productId" },
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

    if (status) filter.status = status;

    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const data = await this.productModel
      .find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await this.productModel.countDocuments(filter);

    return { data, total };
  }
}
