import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../entities/products.schema';

@ObjectType()
export class PaginatedProducts {
  @Field(() => [Product])
  data!: Product[];

  @Field(() => Int)
  total!: number;
}
