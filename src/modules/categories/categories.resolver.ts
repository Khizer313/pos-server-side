import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './caategories.service';
import { Category } from './entities/categories.schema';
import { CreateCategoryInput } from './dto/categories.input';
import { PaginatedCategories } from './dto/paginated-categories.output';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Mutation(() => Category)
  createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('categoryId', { type: () => Int }) categoryId: number,
    @Args('updateCategoryInput') updateCategoryInput: CreateCategoryInput,
  ) {
    return this.categoriesService.updateByCategoryId(categoryId, updateCategoryInput);
  }

  @Mutation(() => Category)
  removeCategory(@Args('categoryId', { type: () => Int }) categoryId: number) {
    return this.categoriesService.removeByCategoryId(categoryId);
  }

  @Query(() => PaginatedCategories)
  async categoriesPaginated(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('status', { type: () => String, nullable: true }) status?: string,
    @Args('startDate', { type: () => String, nullable: true }) startDate?: string,
    @Args('endDate', { type: () => String, nullable: true }) endDate?: string,
  ) {
    return this.categoriesService.findPaginated(page, limit, search, status, 'createdAt', startDate, endDate);
  }
}
