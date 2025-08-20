import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Brand } from '../entities/brands.schema'

@ObjectType()
export class PaginatedBrands {
  @Field(() => [Brand])
  data!: Brand[];

  @Field(() => Int)
  total!: number;
}
