import { SuppliersService } from './suppliers.service';
import { Supplier } from './entities/suppliers.schema';
import { CreateSupplierInput } from './dto/suppliers.input';
export declare class SuppliersResolver {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    findAll(): Promise<Supplier[]>;
    getSupplierByPhone(phone: string): Promise<Supplier | null>;
    createSupplier(createSupplierInput: CreateSupplierInput): Promise<Supplier>;
    updateSupplier(supplierId: number, updateSupplierInput: CreateSupplierInput): Promise<Supplier | null>;
    removeSupplier(supplierId: number): Promise<Supplier | null>;
    suppliersPaginated(page: number, limit: number, search?: string, status?: string, startDate?: string, endDate?: string): Promise<{
        data: Supplier[];
        total: number;
    }>;
}
