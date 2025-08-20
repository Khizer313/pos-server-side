import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/products.schema';
import { CreateProductInput } from './dto/products.input';
import { PaginatedProducts } from './dto/paginated-products.output';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  findAll() {
    return this.productsService.findAll();
  }

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId', { type: () => Int }) productId: number,
    @Args('updateProductInput') updateProductInput: CreateProductInput,
  ) {
    return this.productsService.updateByProductId(productId, updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('productId', { type: () => Int }) productId: number) {
    return this.productsService.removeByProductId(productId);
  }

  @Query(() => PaginatedProducts)
  async productsPaginated(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('status', { type: () => String, nullable: true }) status?: string,
    @Args('startDate', { type: () => String, nullable: true }) startDate?: string,
    @Args('endDate', { type: () => String, nullable: true }) endDate?: string,
  ) {
    return this.productsService.findPaginated(page, limit, search, status, 'createdAt', startDate, endDate);
  }
}
