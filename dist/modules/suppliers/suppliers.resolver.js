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
exports.SuppliersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const suppliers_service_1 = require("./suppliers.service");
const suppliers_schema_1 = require("./entities/suppliers.schema");
const suppliers_input_1 = require("./dto/suppliers.input");
const paginated_suppliers_output_1 = require("./dto/paginated-suppliers.output");
let SuppliersResolver = class SuppliersResolver {
    constructor(suppliersService) {
        this.suppliersService = suppliersService;
    }
    findAll() {
        return this.suppliersService.findAll();
    }
    getSupplierByPhone(phone) {
        return this.suppliersService.findByPhone(phone);
    }
    createSupplier(createSupplierInput) {
        return this.suppliersService.create(createSupplierInput);
    }
    updateSupplier(supplierId, updateSupplierInput) {
        return this.suppliersService.updateBySupplierId(supplierId, updateSupplierInput);
    }
    removeSupplier(supplierId) {
        return this.suppliersService.removeBySupplierId(supplierId);
    }
    async suppliersPaginated(page, limit, search, status, startDate, endDate) {
        return this.suppliersService.findPaginated(page, limit, search, status, 'createdAt', startDate, endDate);
    }
};
exports.SuppliersResolver = SuppliersResolver;
__decorate([
    (0, graphql_1.Query)(() => [suppliers_schema_1.Supplier], { name: 'suppliers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SuppliersResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => suppliers_schema_1.Supplier, { name: 'supplierByPhone' }),
    __param(0, (0, graphql_1.Args)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SuppliersResolver.prototype, "getSupplierByPhone", null);
__decorate([
    (0, graphql_1.Mutation)(() => suppliers_schema_1.Supplier),
    __param(0, (0, graphql_1.Args)('createSupplierInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [suppliers_input_1.CreateSupplierInput]),
    __metadata("design:returntype", void 0)
], SuppliersResolver.prototype, "createSupplier", null);
__decorate([
    (0, graphql_1.Mutation)(() => suppliers_schema_1.Supplier),
    __param(0, (0, graphql_1.Args)('supplierId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('updateSupplierInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, suppliers_input_1.CreateSupplierInput]),
    __metadata("design:returntype", void 0)
], SuppliersResolver.prototype, "updateSupplier", null);
__decorate([
    (0, graphql_1.Mutation)(() => suppliers_schema_1.Supplier),
    __param(0, (0, graphql_1.Args)('supplierId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SuppliersResolver.prototype, "removeSupplier", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_suppliers_output_1.PaginatedSuppliers),
    __param(0, (0, graphql_1.Args)('page', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('search', { type: () => String, nullable: true })),
    __param(3, (0, graphql_1.Args)('status', { type: () => String, nullable: true })),
    __param(4, (0, graphql_1.Args)('startDate', { type: () => String, nullable: true })),
    __param(5, (0, graphql_1.Args)('endDate', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SuppliersResolver.prototype, "suppliersPaginated", null);
exports.SuppliersResolver = SuppliersResolver = __decorate([
    (0, graphql_1.Resolver)(() => suppliers_schema_1.Supplier),
    __metadata("design:paramtypes", [suppliers_service_1.SuppliersService])
], SuppliersResolver);
//# sourceMappingURL=suppliers.resolver.js.map