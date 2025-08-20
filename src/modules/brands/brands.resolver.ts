import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrandsService } from './brands.service';
import { Brand } from './entities/brands.schema';
import { CreateBrandInput } from './dto/brands.input';
import { PaginatedBrands } from './dto/paginated-brands.output';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Query(() => [Brand], { name: 'brands' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Mutation(() => Brand)
  createBrand(
    @Args('createBrandInput') createBrandInput: CreateBrandInput,
  ) {
    return this.brandsService.create(createBrandInput);
  }

  @Mutation(() => Brand)
  updateBrand(
    @Args('brandId', { type: () => Int }) brandId: number,
    @Args('updateBrandInput') updateBrandInput: CreateBrandInput,
  ) {
    return this.brandsService.updateByBrandId(brandId, updateBrandInput);
  }

  @Mutation(() => Brand)
  removeBrand(@Args('brandId', { type: () => Int }) brandId: number) {
    return this.brandsService.removeByBrandId(brandId);
  }

  @Query(() => PaginatedBrands)
  brandsPaginated(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('status', { type: () => String, nullable: true }) status?: string,
    @Args('startDate', { type: () => String, nullable: true }) startDate?: string,
    @Args('endDate', { type: () => String, nullable: true }) endDate?: string,
  ) {
    return this.brandsService.findPaginated(page, limit, search, status, startDate, endDate);
  }
}
