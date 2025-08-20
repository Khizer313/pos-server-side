import { Model } from 'mongoose';
import { Product, ProductDocument } from './entities/products.schema';
import { CreateProductInput } from './dto/products.input';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    create(createProductInput: CreateProductInput): Promise<Product>;
    updateByProductId(productId: number, updateData: Partial<Product>): Promise<Product | null>;
    removeByProductId(productId: number): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    findPaginated(page: number, limit: number, search?: string, status?: string, sortBy?: string, startDate?: string, endDate?: string, sortOrder?: 'asc' | 'desc'): Promise<{
        data: Product[];
        total: number;
    }>;
}
