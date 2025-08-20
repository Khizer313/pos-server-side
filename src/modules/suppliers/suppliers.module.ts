import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuppliersResolver } from './suppliers.resolver';
import { SuppliersService } from './suppliers.service';
import { Supplier, SupplierSchema } from './entities/suppliers.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Supplier.name, schema: SupplierSchema }])],
  providers: [SuppliersResolver, SuppliersService],
})
export class SuppliersModule {}
