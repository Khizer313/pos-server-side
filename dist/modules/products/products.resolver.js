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
exports.ProductsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const products_service_1 = require("./products.service");
const products_schema_1 = require("./entities/products.schema");
const products_input_1 = require("./dto/products.input");
const paginated_products_output_1 = require("./dto/paginated-products.output");
let ProductsResolver = class ProductsResolver {
    constructor(productsService) {
        this.productsService = productsService;
    }
    findAll() {
        return this.productsService.findAll();
    }
    createProduct(createProductInput) {
        return this.productsService.create(createProductInput);
    }
    updateProduct(productId, updateProductInput) {
        return this.productsService.updateByProductId(productId, updateProductInput);
    }
    removeProduct(productId) {
        return this.productsService.removeByProductId(productId);
    }
    async productsPaginated(page, limit, search, status, startDate, endDate) {
        return this.productsService.findPaginated(page, limit, search, status, 'createdAt', startDate, endDate);
    }
};
exports.ProductsResolver = ProductsResolver;
__decorate([
    (0, graphql_1.Query)(() => [products_schema_1.Product], { name: 'products' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => products_schema_1.Product),
    __param(0, (0, graphql_1.Args)('createProductInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [products_input_1.CreateProductInput]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "createProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => products_schema_1.Product),
    __param(0, (0, graphql_1.Args)('productId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('updateProductInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, products_input_1.CreateProductInput]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "updateProduct", null);
__decorate([
    (0, graphql_1.Mutation)(() => products_schema_1.Product),
    __param(0, (0, graphql_1.Args)('productId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsResolver.prototype, "removeProduct", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_products_output_1.PaginatedProducts),
    __param(0, (0, graphql_1.Args)('page', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('search', { type: () => String, nullable: true })),
    __param(3, (0, graphql_1.Args)('status', { type: () => String, nullable: true })),
    __param(4, (0, graphql_1.Args)('startDate', { type: () => String, nullable: true })),
    __param(5, (0, graphql_1.Args)('endDate', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductsResolver.prototype, "productsPaginated", null);
exports.ProductsResolver = ProductsResolver = __decorate([
    (0, graphql_1.Resolver)(() => products_schema_1.Product),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsResolver);
//# sourceMappingURL=products.resolver.js.map