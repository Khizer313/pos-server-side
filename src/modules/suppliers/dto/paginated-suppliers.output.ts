import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Supplier } from '../entities/suppliers.schema';

@ObjectType()
export class PaginatedSuppliers {
  @Field(() => [Supplier])
  data!: Supplier[];

  @Field(() => Int)
  total!: number;
}
