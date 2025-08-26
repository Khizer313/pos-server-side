import { Model } from 'mongoose';
import { Variation, VariationDocument } from './entities/variations.schema';
import { CreateVariationInput } from './dto/variations.input';
export declare class VariationsService {
    private variationModel;
    constructor(variationModel: Model<VariationDocument>);
    create(input: CreateVariationInput): Promise<Variation>;
    updateByVariationId(variationId: number, update: Partial<Variation>): Promise<Variation | null>;
    removeByVariationId(variationId: number): Promise<Variation | null>;
    findAll(): Promise<Variation[]>;
    findPaginated(page: number, limit: number, search?: string, status?: string, startDate?: string, endDate?: string): Promise<{
        data: (import("mongoose").FlattenMaps<VariationDocument> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
        total: number;
    }>;
}
