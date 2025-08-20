import { CategoriesService } from './caategories.service';
import { Category } from './entities/categories.schema';
import { CreateCategoryInput } from './dto/categories.input';
export declare class CategoriesResolver {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<Category[]>;
    createCategory(createCategoryInput: CreateCategoryInput): Promise<Category>;
    updateCategory(categoryId: number, updateCategoryInput: CreateCategoryInput): Promise<Category | null>;
    removeCategory(categoryId: number): Promise<Category | null>;
    categoriesPaginated(page: number, limit: number, search?: string, status?: string, startDate?: string, endDate?: string): Promise<{
        data: Category[];
        total: number;
    }>;
}
