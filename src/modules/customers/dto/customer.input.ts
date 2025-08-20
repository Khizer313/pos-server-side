// CreateCustomerInput wo input DTO (Data Transfer Object) hai jo batata hai ke naya customer banate waqt kya data chahiye.

import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString , IsDateString } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @Field()
  @IsString()
  balance!: string;

  @Field()
  @IsString()
  status!: string;

  
  
}
