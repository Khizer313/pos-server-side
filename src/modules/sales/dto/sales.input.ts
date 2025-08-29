import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class SaleItemInput {
  @Field(() => Int)
   @Field(() => Int, { nullable: true }) 
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

  // ❌ Removed invoiceNo → backend will always generate it

  @Field()
  date!: string;

  @Field()
  status!: string;

  @Field()
  paymentMethod!: string;

  @Field({ nullable: true })
  notes?: string;

  @Field(() => Float)
  total!: number;

  @Field(() => [SaleItemInput])
  items!: SaleItemInput[];
}

// ✅ Update Sale Input (optional fields)
@InputType()
export class UpdateSaleItemInput {
  @Field(() => Int, { nullable: true })
  productId?: number;

  @Field({ nullable: true })
  productName?: string;

  @Field(() => Int, { nullable: true })
  ctn?: number;

  @Field(() => Int, { nullable: true })
  pieces?: number;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => Float, { nullable: true })
  total?: number;
}

@InputType()
export class UpdateSaleInput {
  @Field(() => Int, { nullable: true })
  customerId?: number;

  @Field({ nullable: true })
  invoiceNo?: string;

  @Field({ nullable: true })
  date?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  paymentMethod?: string;

  @Field({ nullable: true })
  notes?: string;

  @Field(() => Float, { nullable: true })
  total?: number;

  // ✅ items will now use UpdateSaleItemInput
  @Field(() => [UpdateSaleItemInput], { nullable: true })
  items?: UpdateSaleItemInput[];
}






@InputType()
export class FilterInput {
  @Field()
  field!: string;

  @Field()
  operator!: string;

  @Field()   // 👈 yaha dikkat
  value!: string;
}


@InputType()
export class SortInput {
  @Field()
  field!: string;

  @Field()
  direction!: 'asc' | 'desc';
}