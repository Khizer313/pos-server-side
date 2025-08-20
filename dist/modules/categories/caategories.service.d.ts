import { Model } from 'mongoose';
import { Category, CategoryDocument } from './entities/categories.schema';
import { CreateCategoryInput } from './dto/categories.input';
export declare class CategoriesService {
    private categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    create(createCategoryInput: CreateCategoryInput): Promise<Category>;
    updateByCategoryId(categoryId: number, updateData: Partial<Category>): Promise<Category | null>;
    removeByCategoryId(categoryId: number): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    findPaginated(page: number, limit: number, search?: string, status?: string, sortBy?: string, startDate?: string, endDate?: string, sortOrder?: 'asc' | 'desc'): Promise<{
        data: Category[];
        total: number;
    }>;
}
