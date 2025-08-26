import { SalesService } from './sales.services';
import { Sale } from './entities/sales.schema';
import { CreateSaleInput } from './dto/sales.input';
export declare class SalesResolver {
    private readonly salesService;
    constructor(salesService: SalesService);
    findAll(): Promise<Sale[]>;
    getSaleById(saleId: number): Promise<Sale | null>;
    createSale(createSaleInput: CreateSaleInput): Promise<Sale>;
    updateSale(saleId: number, updateSaleInput: CreateSaleInput): Promise<Sale | null>;
    removeSale(saleId: number): Promise<Sale | null>;
    getSalesPaginated(page: number, limit: number, search?: string, status?: string, paymentMethod?: string, startDate?: string, endDate?: string): Promise<{
        data: Sale[];
        total: number;
    }>;
}
