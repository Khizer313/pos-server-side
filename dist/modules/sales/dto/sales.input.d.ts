export declare class SaleItemInput {
    productId: number;
    productName: string;
    ctn: number;
    pieces: number;
    quantity: number;
    price: number;
    total: number;
}
export declare class CreateSaleInput {
    customerId: number;
    invoiceNo: string;
    date: string;
    status: string;
    paymentMethod: string;
    notes: string;
    total: number;
    items: SaleItemInput[];
}
