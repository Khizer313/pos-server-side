import { Document } from 'mongoose';
export type SaleDocument = Sale & Document;
export declare class SaleItem {
    productId?: number;
    productName?: string;
    ctn?: number;
    pieces?: number;
    quantity?: number;
    price?: number;
    total?: number;
}
export declare const SaleItemSchema: import("mongoose").Schema<SaleItem, import("mongoose").Model<SaleItem, any, any, any, Document<unknown, any, SaleItem, any> & SaleItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SaleItem, Document<unknown, {}, import("mongoose").FlatRecord<SaleItem>, {}> & import("mongoose").FlatRecord<SaleItem> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Sale {
    saleId: number;
    customerId: number;
    invoiceNo: string;
    date: string;
    status: string;
    createdAt: Date;
    paymentMethod: string;
    notes?: string;
    total: number;
    items?: SaleItem[];
}
export declare const SaleSchema: import("mongoose").Schema<Sale, import("mongoose").Model<Sale, any, any, any, Document<unknown, any, Sale, any> & Sale & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sale, Document<unknown, {}, import("mongoose").FlatRecord<Sale>, {}> & import("mongoose").FlatRecord<Sale> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
