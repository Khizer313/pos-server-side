import { Document } from 'mongoose';
export type SupplierDocument = Supplier & Document;
export declare class Supplier {
    supplierId: number;
    name: string;
    phone: string;
    balance: string;
    status: string;
    createdAt: Date;
}
export declare const SupplierSchema: import("mongoose").Schema<Supplier, import("mongoose").Model<Supplier, any, any, any, Document<unknown, any, Supplier, any> & Supplier & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Supplier, Document<unknown, {}, import("mongoose").FlatRecord<Supplier>, {}> & import("mongoose").FlatRecord<Supplier> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
