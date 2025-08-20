import { Document } from 'mongoose';
export type BrandDocument = Brand & Document;
export declare class Brand {
    brandId: number;
    name: string;
    status: string;
    createdAt: Date;
}
export declare const BrandSchema: import("mongoose").Schema<Brand, import("mongoose").Model<Brand, any, any, any, Document<unknown, any, Brand, any> & Brand & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Brand, Document<unknown, {}, import("mongoose").FlatRecord<Brand>, {}> & import("mongoose").FlatRecord<Brand> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
