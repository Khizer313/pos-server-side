import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsResolver } from './brands.resolver';
import { BrandsService } from './brands.service';
import { Brand, BrandSchema } from './entities/brands.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }])],
  providers: [BrandsResolver, BrandsService],
})
export class BrandsModule {}
