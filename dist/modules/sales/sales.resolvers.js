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
exports.SalesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const sales_services_1 = require("./sales.services");
const sales_schema_1 = require("./entities/sales.schema");
const sales_input_1 = require("./dto/sales.input");
const paginated_sales_output_1 = require("./dto/paginated-sales.output");
let SalesResolver = class SalesResolver {
    constructor(salesService) {
        this.salesService = salesService;
    }
    findAll() {
        return this.salesService.findAll();
    }
    getSaleById(saleId) {
        return this.salesService.findBySaleId(saleId);
    }
    createSale(createSaleInput) {
        return this.salesService.create(createSaleInput);
    }
    updateSale(saleId, updateSaleInput) {
        return this.salesService.updateBySaleId(saleId, updateSaleInput);
    }
    removeSale(saleId) {
        return this.salesService.removeBySaleId(saleId);
    }
    getSalesPaginated(page, limit, search, status, paymentMethod, startDate, endDate) {
        return this.salesService.findPaginated(page, limit, search, status, startDate, endDate, paymentMethod);
    }
};
exports.SalesResolver = SalesResolver;
__decorate([
    (0, graphql_1.Query)(() => [sales_schema_1.Sale], { name: 'sales' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SalesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => sales_schema_1.Sale, { name: 'saleById' }),
    __param(0, (0, graphql_1.Args)('saleId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalesResolver.prototype, "getSaleById", null);
__decorate([
    (0, graphql_1.Mutation)(() => sales_schema_1.Sale),
    __param(0, (0, graphql_1.Args)('createSaleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sales_input_1.CreateSaleInput]),
    __metadata("design:returntype", void 0)
], SalesResolver.prototype, "createSale", null);
__decorate([
    (0, graphql_1.Mutation)(() => sales_schema_1.Sale),
    __param(0, (0, graphql_1.Args)('saleId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('updateSaleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, sales_input_1.CreateSaleInput]),
    __metadata("design:returntype", void 0)
], SalesResolver.prototype, "updateSale", null);
__decorate([
    (0, graphql_1.Mutation)(() => sales_schema_1.Sale),
    __param(0, (0, graphql_1.Args)('saleId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalesResolver.prototype, "removeSale", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_sales_output_1.PaginatedSales, { name: 'getSalesPaginated' }),
    __param(0, (0, graphql_1.Args)('page', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('search', { type: () => String, nullable: true })),
    __param(3, (0, graphql_1.Args)('status', { type: () => String, nullable: true })),
    __param(4, (0, graphql_1.Args)('paymentMethod', { type: () => String, nullable: true })),
    __param(5, (0, graphql_1.Args)('startDate', { type: () => String, nullable: true })),
    __param(6, (0, graphql_1.Args)('endDate', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], SalesResolver.prototype, "getSalesPaginated", null);
exports.SalesResolver = SalesResolver = __decorate([
    (0, graphql_1.Resolver)(() => sales_schema_1.Sale),
    __metadata("design:paramtypes", [sales_services_1.SalesService])
], SalesResolver);
//# sourceMappingURL=sales.resolvers.js.map