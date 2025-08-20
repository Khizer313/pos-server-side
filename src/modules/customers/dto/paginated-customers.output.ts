import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Customer } from '../entities/customer.schema';

@ObjectType()
export class PaginatedCustomers {
  @Field(() => [Customer])
  data!: Customer[];

  @Field(() => Int)
  total!: number;
}
