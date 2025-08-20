import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

export type ProductDocument = Product & Document;

@ObjectType()
@Schema()
export class Product {
  @Field(() => Int)
  @Prop({ required: true, unique: true })
  productId!: number;

  @Field()
  @Prop({ required: true, index: true })
  name!: string;

  @Field()
  @Prop({ required: true })
  categoryAssigned!: string;

  @Field(() => Float)
  @Prop({ required: true })
  price!: number;

   @Field(() => Int)
  @Prop({ required: true })
  pieces!: number;

  @Field()
  @Prop({ required: true })
  status!: string;

  @Field()
  @Prop({ required: true })
  createdAt!: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
