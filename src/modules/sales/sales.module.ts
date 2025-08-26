import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SalesService } from './sales.services'
import { SalesResolver } from './sales.resolvers';
import { Sale, SaleSchema } from './entities/sales.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }])],
  providers: [SalesResolver, SalesService],
})
export class SalesModule {}
