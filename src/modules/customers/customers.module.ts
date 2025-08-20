// Customers related backend components ko manage karta hai.Ye customers ke resolver, service, aur schema ko ek jagah bundle karta hai.MongooseModule.forFeature yahan Customer schema ko register karta hai.

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';
import { Customer, CustomerSchema } from './entities/customer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
  providers: [CustomersResolver, CustomersService],
})
export class CustomersModule {}
