import { Model } from 'mongoose';
import { Sale, SaleDocument } from './entities/sales.schema';
import { CreateSaleInput } from './dto/sales.input';
export declare class SalesService {
    private saleModel;
    constructor(saleModel: Model<SaleDocument>);
    create(createSaleInput: CreateSaleInput): Promise<Sale>;
    updateBySaleId(saleId: number, updateData: Partial<Sale>): Promise<Sale | null>;
    removeBySaleId(saleId: number): Promise<Sale | null>;
    findAll(): Promise<Sale[]>;
    findBySaleId(saleId: number): Promise<Sale | null>;
    findPaginated(page: number, limit: number, search?: string, status?: string, startDate?: string, endDate?: string, paymentMethod?: string): Promise<{
        data: Sale[];
        total: number;
    }>;
}
