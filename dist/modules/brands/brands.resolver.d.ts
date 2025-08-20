import { BrandsService } from './brands.service';
import { Brand } from './entities/brands.schema';
import { CreateBrandInput } from './dto/brands.input';
export declare class BrandsResolver {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    findAll(): Promise<Brand[]>;
    createBrand(createBrandInput: CreateBrandInput): Promise<Brand>;
    updateBrand(brandId: number, updateBrandInput: CreateBrandInput): Promise<Brand | null>;
    removeBrand(brandId: number): Promise<Brand | null>;
    brandsPaginated(page: number, limit: number, search?: string, status?: string, startDate?: string, endDate?: string): Promise<{
        data: Brand[];
        total: number;
    }>;
}
