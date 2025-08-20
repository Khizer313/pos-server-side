import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export type BrandDocument = Brand & Document;

@ObjectType()
@Schema()
export class Brand {
  @Field(() => Int)
  @Prop({ required: true, unique: true })
  brandId!: number;

  @Field()
  @Prop({ required: true, index: true, unique: true })
  name!: string;

  @Field()
  @Prop({ index: true })
  status!: string;

  @Field()
  @Prop()
  createdAt!: Date;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
