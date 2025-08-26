import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export type SaleDocument = Sale & Document;

@ObjectType()
@Schema()
export class SaleItem {
  @Field(() => Int)
  @Prop({ required: true })
  productId!: number;

  @Field()
  @Prop({ required: true })
  productName!: string;

  @Field(() => Int)
  @Prop({ required: true })
  ctn!: number;

  @Field(() => Int)
  @Prop({ required: true })
  pieces!: number;

  @Field(() => Int)
  @Prop({ required: true })
  quantity!: number;

  @Field()
  @Prop({ required: true })
  price!: number;

  @Field()
  @Prop({ required: true })
  total!: number;
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
  @Prop()
  invoiceNo!: string;

  @Field()
  @Prop()
  date!: string;

  @Field()
  @Prop()
  status!: string;

  @Field()
  @Prop()
  createdAt!: Date;

  @Field()
  @Prop()
  paymentMethod!: string;

  @Field()
  @Prop()
  notes!: string;

  @Field()
  @Prop()
  total!: number;

  @Field(() => [SaleItem])
  @Prop({ type: [SaleItemSchema], default: [] }) // ✅ reference after declaration
  items!: SaleItem[];
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
