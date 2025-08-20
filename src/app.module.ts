// # Root module hy yani Backend architecture ka central hub., aisi file jahan sa NestJS app start hota hai
// Ye file backend ke modules ko register karti hai.CustomersModule, GraphQLModule, MongooseModule yahan import aur configure hote hain.




import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; // 👈 Add this

// Import your modules here
import { CustomersModule } from './modules/customers/customers.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module'; 
import { BrandsModule } from './modules/brands/brands.module'; 
import { CategoriesModule } from './modules/categories/categories.module';
@Module({
  imports: [
    // .env file load hoti hai globally
    ConfigModule.forRoot({ isGlobal: true }),

    // MongoDB connection (no need for useNewUrlParser or useUnifiedTopology now)
    MongooseModule.forRoot(process.env.MONGODB_URI || ''),

    // GraphQL setup with auto-generated schema.gql
    GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // Playground for testing queries
    }),

    // Feature Modules
    CustomersModule,
    SuppliersModule, 
    BrandsModule, 
    CategoriesModule,
  ],
})
export class AppModule {}