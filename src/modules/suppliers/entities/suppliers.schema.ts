import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

export type SupplierDocument = Supplier & Document;

@ObjectType()
@Schema()
export class Supplier {
  @Field()
  @Prop({ required: true, unique: true })
  supplierId!: number;

  @Field()
  @Prop({ required: true, index: true })
  name!: string;

  @Field()
  @Prop({ required: true, unique: true, index: true })
  phone!: string;

  @Field()
  @Prop({ index: true })
  balance!: string;

  @Field()
  @Prop({ index: true })
  status!: string;

  @Field()
  @Prop({ index: true })
  createdAt!: Date;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
