import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SaleItemInput {
  @Field(() => Int)
  productId!: number;

  @Field()
  productName!: string;

  @Field(() => Int)
  ctn!: number;

  @Field(() => Int)
  pieces!: number;

  @Field(() => Int)
  quantity!: number;

  @Field(() => Float)
  price!: number;

  @Field(() => Float)
  total!: number;
}

@InputType()
export class CreateSaleInput {
  @Field(() => Int)
  customerId!: number;

  @Field()
  invoiceNo!: string;

  @Field()
  date!: string;

  @Field()
  status!: string;

  @Field()
  paymentMethod!: string;

  @Field()
  notes!: string;

  @Field(() => Float)
  total!: number;

  @Field(() => [SaleItemInput])
  items!: SaleItemInput[];
}
