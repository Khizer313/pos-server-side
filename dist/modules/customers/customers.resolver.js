"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const customers_service_1 = require("./customers.service");
const customer_schema_1 = require("./entities/customer.schema");
const customer_input_1 = require("./dto/customer.input");
const paginated_customers_output_1 = require("./dto/paginated-customers.output");
let CustomersResolver = class CustomersResolver {
    constructor(customersService) {
        this.customersService = customersService;
    }
    findAll() {
        return this.customersService.findAll();
    }
    getCustomerByPhone(phone) {
        return this.customersService.findByPhone(phone);
    }
    createCustomer(createCustomerInput) {
        return this.customersService.create(createCustomerInput);
    }
    updateCustomer(customerId, updateCustomerInput) {
        return this.customersService.updateByCustomerId(customerId, updateCustomerInput);
    }
    removeCustomer(customerId) {
        return this.customersService.removeByCustomerId(customerId);
    }
    async customersPaginated(page, limit, search, status, startDate, endDate) {
        return this.customersService.findPaginated(page, limit, search, status, 'createdAt', startDate, endDate);
    }
};
exports.CustomersResolver = CustomersResolver;
__decorate([
    (0, graphql_1.Query)(() => [customer_schema_1.Customer], { name: 'customers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomersResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => customer_schema_1.Customer, { name: 'customerByPhone' }),
    __param(0, (0, graphql_1.Args)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomersResolver.prototype, "getCustomerByPhone", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_schema_1.Customer),
    __param(0, (0, graphql_1.Args)('createCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_input_1.CreateCustomerInput]),
    __metadata("design:returntype", void 0)
], CustomersResolver.prototype, "createCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_schema_1.Customer),
    __param(0, (0, graphql_1.Args)('customerId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('updateCustomerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, customer_input_1.CreateCustomerInput]),
    __metadata("design:returntype", void 0)
], CustomersResolver.prototype, "updateCustomer", null);
__decorate([
    (0, graphql_1.Mutation)(() => customer_schema_1.Customer),
    __param(0, (0, graphql_1.Args)('customerId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomersResolver.prototype, "removeCustomer", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_customers_output_1.PaginatedCustomers),
    __param(0, (0, graphql_1.Args)('page', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('search', { type: () => String, nullable: true })),
    __param(3, (0, graphql_1.Args)('status', { type: () => String, nullable: true })),
    __param(4, (0, graphql_1.Args)('startDate', { type: () => String, nullable: true })),
    __param(5, (0, graphql_1.Args)('endDate', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], CustomersResolver.prototype, "customersPaginated", null);
exports.CustomersResolver = CustomersResolver = __decorate([
    (0, graphql_1.Resolver)(() => customer_schema_1.Customer),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersResolver);
//# sourceMappingURL=customers.resolver.js.map