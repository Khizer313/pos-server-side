import { VariationsService } from './variations.services';
import { Variation } from './entities/variations.schema';
import { CreateVariationInput } from './dto/variations.input';
export declare class VariationsResolver {
    private readonly variationsService;
    constructor(variationsService: VariationsService);
    findAll(): Promise<Variation[]>;
    createVariation(input: CreateVariationInput): Promise<Variation>;
    updateVariation(variationId: number, input: CreateVariationInput): Promise<Variation | null>;
    removeVariation(variationId: number): Promise<Variation | null>;
    variationsPaginated(page: number, limit: number, search?: string, status?: string, startDate?: string, endDate?: string): Promise<{
        data: (import("mongoose").FlattenMaps<import("./entities/variations.schema").VariationDocument> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        })[];
        total: number;
    }>;
}
