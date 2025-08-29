import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

export type SaleDocument = Sale & Document;

@ObjectType()
@Schema()
export class SaleItem {
  @Field(() => Int, { nullable: true })
  @Prop({ required: false })
  productId?: number;

  @Field({ nullable: true })
  @Prop({ required: false })
  productName?: string;

  @Field(() => Int, { nullable: true })
  @Prop({ required: false })
  ctn?: number;

  @Field(() => Int, { nullable: true })
  @Prop({ required: false })
  pieces?: number;

  @Field(() => Int, { nullable: true })
  @Prop({ required: false })
  quantity?: number;

  @Field(() => Float, { nullable: true })
  @Prop({ required: false })
  price?: number;

  @Field(() => Float, { nullable: true })
  @Prop({ required: false })
  total?: number;
}

export const SaleItemSchema = SchemaFactory.createForClass(SaleItem);

@ObjectType()
@Schema()
export class Sale {
  @Field(() => Int)
  @Prop({ required: true, unique: true })
  saleId!: number;

  @Field(() => Int)
  @Prop({ required: true })
  customerId!: number;

  @Field()
  @Prop({ required: true })
  invoiceNo!: string;

  @Field()
  @Prop({ required: true })
  date!: string;

  @Field()
  @Prop({ required: true })
  status!: string;

  @Field()
  @Prop({ required: true })
  createdAt!: Date;

  @Field()
  @Prop({ required: true })
  paymentMethod!: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  notes?: string;

  @Field(() => Float)
  @Prop({ required: true })
  total!: number;

  @Field(() => [SaleItem], { nullable: true })
  @Prop({ type: [SaleItemSchema], default: [] })
  items?: SaleItem[];
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
