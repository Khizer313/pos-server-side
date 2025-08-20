import { Model } from 'mongoose';
import { Brand, BrandDocument } from './entities/brands.schema';
import { CreateBrandInput } from './dto/brands.input';
export declare class BrandsService {
    private brandModel;
    constructor(brandModel: Model<BrandDocument>);
    create(createBrandInput: CreateBrandInput): Promise<Brand>;
    updateByBrandId(brandId: number, updateData: Partial<Brand>): Promise<Brand | null>;
    removeByBrandId(brandId: number): Promise<Brand | null>;
    findAll(): Promise<Brand[]>;
    findPaginated(page: number, limit: number, search?: string, status?: string, startDate?: string, endDate?: string, sortBy?: string, sortOrder?: 'asc' | 'desc'): Promise<{
        data: Brand[];
        total: number;
    }>;
}
