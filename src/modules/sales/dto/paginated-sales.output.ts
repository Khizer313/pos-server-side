import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Sale } from '../entities/sales.schema';

@ObjectType()
export class PaginatedSales {
  @Field(() => [Sale])
  data!: Sale[];

  @Field(() => Int)
  total!: number;
}
