import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name!: string;

  @Field()
  categoryAssigned!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Int)
  pieces!: number;

  @Field()
  status!: string;
}
