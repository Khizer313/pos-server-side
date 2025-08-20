import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './entities/customer.schema';
import { CreateCustomerInput } from './dto/customer.input';
export declare class CustomersService {
    private customerModel;
    constructor(customerModel: Model<CustomerDocument>);
    create(createCustomerInput: CreateCustomerInput): Promise<Customer>;
    updateByCustomerId(customerId: number, updateData: Partial<Customer>): Promise<Customer | null>;
    removeByCustomerId(customerId: number): Promise<Customer | null>;
    findAll(): Promise<Customer[]>;
    findPaginated(page: number, limit: number, search?: string, status?: string, sortBy?: string, startDate?: string, endDate?: string, sortOrder?: 'asc' | 'desc'): Promise<{
        data: Customer[];
        total: number;
    }>;
    findByPhone(phone: string): Promise<Customer | null>;
}
