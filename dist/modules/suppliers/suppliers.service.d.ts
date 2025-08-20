import { Model } from 'mongoose';
import { Supplier, SupplierDocument } from './entities/suppliers.schema';
import { CreateSupplierInput } from './dto/suppliers.input';
export declare class SuppliersService {
    private supplierModel;
    constructor(supplierModel: Model<SupplierDocument>);
    create(createSupplierInput: CreateSupplierInput): Promise<Supplier>;
    updateBySupplierId(supplierId: number, updateData: Partial<Supplier>): Promise<Supplier | null>;
    removeBySupplierId(supplierId: number): Promise<Supplier | null>;
    findAll(): Promise<Supplier[]>;
    findPaginated(page: number, limit: number, search?: string, status?: string, sortBy?: string, startDate?: string, endDate?: string, sortOrder?: 'asc' | 'desc'): Promise<{
        data: Supplier[];
        total: number;
    }>;
    findByPhone(phone: string): Promise<Supplier | null>;
}
