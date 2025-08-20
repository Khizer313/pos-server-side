import { ProductsService } from './products.service';
import { Product } from './entities/products.schema';
import { CreateProductInput } from './dto/products.input';
export declare class ProductsResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<Product[]>;
    createProduct(createProductInput: CreateProductInput): Promise<Product>;
    updateProduct(productId: number, updateProductInput: CreateProductInput): Promise<Product | null>;
    removeProduct(productId: number): Promise<Product | null>;
    productsPaginated(page: number, limit: number, search?: string, status?: string, startDate?: string, endDate?: string): Promise<{
        data: Product[];
        total: number;
    }>;
}
