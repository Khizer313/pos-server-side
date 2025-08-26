import { Document } from 'mongoose';
export type VariationDocument = Variation & Document;
export declare class Variation {
    variationId: number;
    name: string;
    productAssigned: string;
    pieces: number;
    price: number;
    status: string;
    createdAt: Date;
}
export declare const VariationSchema: import("mongoose").Schema<Variation, import("mongoose").Model<Variation, any, any, any, Document<unknown, any, Variation, any> & Variation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Variation, Document<unknown, {}, import("mongoose").FlatRecord<Variation>, {}> & import("mongoose").FlatRecord<Variation> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
