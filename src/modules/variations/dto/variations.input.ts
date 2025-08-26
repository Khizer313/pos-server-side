import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVariationInput {
  @Field()
  name!: string;

  @Field()
  productAssigned!: string;

  @Field()
  pieces!: number;

  @Field()
  price!: number;

  @Field()
  status!: string;
}
