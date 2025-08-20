import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.schema';
import { CreateCustomerInput } from './dto/customer.input';
export declare class CustomersResolver {
    private readonly customersService;
    constructor(customersService: CustomersService);
    findAll(): Promise<Customer[]>;
    getCustomerByPhone(phone: string): Promise<Customer | null>;
    createCustomer(createCustomerInput: CreateCustomerInput): Promise<Customer>;
    updateCustomer(customerId: number, updateCustomerInput: CreateCustomerInput): Promise<Customer | null>;
    removeCustomer(customerId: number): Promise<Customer | null>;
    customersPaginated(page: number, limit: number, search?: string, status?: string, startDate?: string, endDate?: string): Promise<{
        data: Customer[];
        total: number;
    }>;
}
