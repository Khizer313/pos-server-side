import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from '../entities/categories.schema';

@ObjectType()
export class PaginatedCategories {
  @Field(() => [Category])
  data!: Category[];

  @Field(() => Int)
  total!: number;
}
