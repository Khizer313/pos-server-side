import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export type VariationDocument = Variation & Document;

@ObjectType()
@Schema()
export class Variation {
  @Field(() => Int)
  @Prop({ required: true, unique: true })
  variationId!: number;

  @Field()
  @Prop({ required: true })
  name!: string;

  @Field()
  @Prop({ required: true })
  productAssigned!: string;

  @Field()
  @Prop({ required: true })
  pieces!: number;

  @Field()
  @Prop({ required: true })
  price!: number;

  @Field()
  @Prop({ required: true })
  status!: string;

  @Field()
  @Prop({ required: true })
  createdAt!: Date;
}

export const VariationSchema = SchemaFactory.createForClass(Variation);
