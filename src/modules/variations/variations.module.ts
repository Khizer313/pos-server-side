import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VariationsResolver } from './variations.resolvers';
import { VariationsService } from './variations.services';
import { Variation, VariationSchema } from './entities/variations.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Variation.name, schema: VariationSchema }])],
  providers: [VariationsResolver, VariationsService],
})
export class VariationsModule {}
