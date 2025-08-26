import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalesService } from './sales.services';
import { Sale } from './entities/sales.schema';
import { CreateSaleInput } from './dto/sales.input';
import { PaginatedSales } from './dto/paginated-sales.output';

@Resolver(() => Sale)
export class SalesResolver {
  constructor(private readonly salesService: SalesService) {}

  @Query(() => [Sale], { name: 'sales' })
  findAll() {
    return this.salesService.findAll();
  }

  @Query(() => Sale, { name: 'saleById' })
  getSaleById(@Args('saleId', { type: () => Int }) saleId: number) {
    return this.salesService.findBySaleId(saleId);
  }

  @Mutation(() => Sale)
  createSale(@Args('createSaleInput') createSaleInput: CreateSaleInput) {
    return this.salesService.create(createSaleInput);
  }

  @Mutation(() => Sale)
  updateSale(
    @Args('saleId', { type: () => Int }) saleId: number,
    @Args('updateSaleInput') updateSaleInput: CreateSaleInput,
  ) {
    return this.salesService.updateBySaleId(saleId, updateSaleInput);
  }

  @Mutation(() => Sale)
  removeSale(@Args('saleId', { type: () => Int }) saleId: number) {
    return this.salesService.removeBySaleId(saleId);
  }

  @Query(() => PaginatedSales, { name: 'getSalesPaginated' })
  getSalesPaginated(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('status', { type: () => String, nullable: true }) status?: string,
    @Args('paymentMethod', { type: () => String, nullable: true }) paymentMethod?: string,
    @Args('startDate', { type: () => String, nullable: true }) startDate?: string,
    @Args('endDate', { type: () => String, nullable: true }) endDate?: string,
  ) {
    return this.salesService.findPaginated(
      page,
      limit,
      search,
      status,
      startDate,
      endDate,
      paymentMethod,
    );
  }
}
