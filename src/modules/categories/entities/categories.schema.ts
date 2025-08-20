import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export type CategoryDocument = Category & Document;

@ObjectType()
@Schema()
export class Category {
  @Field(() => Int)
  @Prop({ required: true, unique: true })
  categoryId!: number;

  @Field()
  @Prop({ required: true, index: true })
  name!: string;

  @Field({ nullable: true })
  @Prop({ index: true })
  brandAssigned?: string;

  @Field()
  @Prop({ required: true, index: true })
  status!: string;

  @Field()
  @Prop({ required: true, index: true })
  createdAt!: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
