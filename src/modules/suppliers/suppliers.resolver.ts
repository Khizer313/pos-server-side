import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SuppliersService } from './suppliers.service';
import { Supplier } from './entities/suppliers.schema';
import { CreateSupplierInput } from './dto/suppliers.input';
import { PaginatedSuppliers } from './dto/paginated-suppliers.output';

@Resolver(() => Supplier)
export class SuppliersResolver {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Query(() => [Supplier], { name: 'suppliers' })
  findAll() {
    return this.suppliersService.findAll();
  }

  @Query(() => Supplier, { name: 'supplierByPhone' })
  getSupplierByPhone(@Args('phone') phone: string) {
    return this.suppliersService.findByPhone(phone);
  }

  @Mutation(() => Supplier)
  createSupplier(@Args('createSupplierInput') createSupplierInput: CreateSupplierInput) {
    return this.suppliersService.create(createSupplierInput);
  }

  @Mutation(() => Supplier)
  updateSupplier(
    @Args('supplierId', { type: () => Int }) supplierId: number,
    @Args('updateSupplierInput') updateSupplierInput: CreateSupplierInput,
  ) {
    return this.suppliersService.updateBySupplierId(supplierId, updateSupplierInput);
  }

  @Mutation(() => Supplier)
  removeSupplier(@Args('supplierId', { type: () => Int }) supplierId: number) {
    return this.suppliersService.removeBySupplierId(supplierId);
  }

  @Query(() => PaginatedSuppliers)
  async suppliersPaginated(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('status', { type: () => String, nullable: true }) status?: string,
    @Args('startDate', { type: () => String, nullable: true }) startDate?: string,
    @Args('endDate', { type: () => String, nullable: true }) endDate?: string,
  ) {
    return this.suppliersService.findPaginated(page, limit, search, status, 'createdAt', startDate, endDate);
  }
}
