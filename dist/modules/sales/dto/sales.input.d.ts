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
    date: string;
    status: string;
    paymentMethod: string;
    notes?: string;
    total: number;
    items: SaleItemInput[];
}
export declare class UpdateSaleItemInput {
    productId?: number;
    productName?: string;
    ctn?: number;
    pieces?: number;
    quantity?: number;
    price?: number;
    total?: number;
}
export declare class UpdateSaleInput {
    customerId?: number;
    invoiceNo?: string;
    date?: string;
    status?: string;
    paymentMethod?: string;
    notes?: string;
    total?: number;
    items?: UpdateSaleItemInput[];
}
export declare class FilterInput {
    field: string;
    operator: string;
    value: string;
}
export declare class SortInput {
    field: string;
    direction: 'asc' | 'desc';
}
