// Customer wo schema/entity hai jo define karta hai ke customer data structure kaisa hoga.
// Ye file MongoDB mein data structure define karti hai.Saath hi ye GraphQL ke liye @ObjectType aur @Field decorators se schema banati hai.Is schema ke mutabiq data database mein store hota hai.

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

export type CustomerDocument = Customer & Document;

@ObjectType()
@Schema( )
@Schema()
export class Customer {

  @Field()
  @Prop({ required: true, unique: true })  // ✅ new field
  customerId!: number; 

  @Field()
  @Prop({ required: true, index: true })  // index added
  name!: string;

  @Field()
  @Prop({ required: true, unique: true, index: true })  // unique + index added
  phone!: string;

  @Field()
  @Prop({ index: true })  // index added
  balance!: string;

  @Field()
  @Prop({ index: true })  // index added
  status!: string;

  @Field()
  @Prop({ index: true })  // index added
  createdAt!: Date; 
}

 


export const CustomerSchema = SchemaFactory.createForClass(Customer);
