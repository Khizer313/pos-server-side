import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variation, VariationDocument } from './entities/variations.schema';
import { CreateVariationInput } from './dto/variations.input';

@Injectable()
export class VariationsService {
  constructor(@InjectModel(Variation.name) private variationModel: Model<VariationDocument>) {}

  async create(input: CreateVariationInput): Promise<Variation> {
    const last = await this.variationModel.findOne().sort({ variationId: -1 }).lean();
    const nextId = last?.variationId ? last.variationId + 1 : 5001;

    const created = new this.variationModel({ ...input, variationId: nextId, createdAt: new Date() });
    return created.save();
  }

  async updateByVariationId(variationId: number, update: Partial<Variation>): Promise<Variation | null> {
    return this.variationModel.findOneAndUpdate({ variationId }, { $set: update }, { new: true }).exec();
  }

  async removeByVariationId(variationId: number): Promise<Variation | null> {
    return this.variationModel.findOneAndDelete({ variationId }).exec();
  }

  async findAll(): Promise<Variation[]> {
    return this.variationModel.find().lean();
  }

async findPaginated(
  page: number,
  limit: number,
  search?: string,
  status?: string,
  startDate?: string,
  endDate?: string,
) {
  const filter: any = {};

  if (search) filter.name = { $regex: search, $options: 'i' };
  if (status) filter.status = status;

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) filter.createdAt.$gte = new Date(startDate);
    if (endDate) {
      // endDate ke din ke end tak include karne ke liye
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
  }

  const data = await this.variationModel
    .find(filter)
    .sort({ createdAt: -1 }) // latest first
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
    .exec();

  const total = await this.variationModel.countDocuments(filter);
  return { data, total };
}

}
