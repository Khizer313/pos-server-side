import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Variation } from '../entities/variations.schema';

@ObjectType()
export class PaginatedVariations {
  @Field(() => [Variation])
  data!: Variation[];

  @Field(() => Int)
  total!: number;
}
