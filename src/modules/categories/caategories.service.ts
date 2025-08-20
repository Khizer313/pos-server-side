import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './entities/categories.schema';
import { CreateCategoryInput } from './dto/categories.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const existing = await this.categoryModel.findOne({ name: createCategoryInput.name });
    if (existing) throw new ConflictException('Category with this name already exists');

    const lastCategory = await this.categoryModel.findOne().sort({ categoryId: -1 }).lean();
    const nextId = lastCategory?.categoryId ? lastCategory.categoryId + 1 : 1001;

    const createdCategory = new this.categoryModel({
      ...createCategoryInput,
      categoryId: nextId,
      createdAt: new Date(),
    });

    return createdCategory.save();
  }

  async updateByCategoryId(categoryId: number, updateData: Partial<Category>): Promise<Category | null> {
    if (updateData.name) {
      const exists = await this.categoryModel.findOne({
        name: updateData.name,
        categoryId: { $ne: categoryId }
      });
      if (exists) throw new Error("Category name already in use");
    }
    return this.categoryModel.findOneAndUpdate({ categoryId }, { $set: updateData }, { new: true }).exec();
  }

  async removeByCategoryId(categoryId: number): Promise<Category | null> {
    return this.categoryModel.findOneAndDelete({ categoryId }).exec();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().lean();
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
  ): Promise<{ data: Category[]; total: number }> {
    const filter: any = {};

    if (search) {
      const terms = search.split(" ").filter(Boolean);
      filter.$and = terms.map(term => ({
        $or: [
          { name: { $regex: `.*${term}.*`, $options: 'i' } },
          { brandAssigned: { $regex: `.*${term}.*`, $options: 'i' } },
          { status: { $regex: `.*${term}.*`, $options: 'i' } },
          {
            $expr: {
              $regexMatch: {
                input: { $toString: "$categoryId" },
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

    const data = await this.categoryModel
      .find(filter)
      .sort(sort)
      .hint({ [sortBy]: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec();

    const total = await this.categoryModel.countDocuments(filter);

    return { data, total };
  }
}
