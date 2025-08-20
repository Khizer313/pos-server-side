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
exports.CategoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const caategories_service_1 = require("./caategories.service");
const categories_schema_1 = require("./entities/categories.schema");
const categories_input_1 = require("./dto/categories.input");
const paginated_categories_output_1 = require("./dto/paginated-categories.output");
let CategoriesResolver = class CategoriesResolver {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    findAll() {
        return this.categoriesService.findAll();
    }
    createCategory(createCategoryInput) {
        return this.categoriesService.create(createCategoryInput);
    }
    updateCategory(categoryId, updateCategoryInput) {
        return this.categoriesService.updateByCategoryId(categoryId, updateCategoryInput);
    }
    removeCategory(categoryId) {
        return this.categoriesService.removeByCategoryId(categoryId);
    }
    async categoriesPaginated(page, limit, search, status, startDate, endDate) {
        return this.categoriesService.findPaginated(page, limit, search, status, 'createdAt', startDate, endDate);
    }
};
exports.CategoriesResolver = CategoriesResolver;
__decorate([
    (0, graphql_1.Query)(() => [categories_schema_1.Category], { name: 'categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => categories_schema_1.Category),
    __param(0, (0, graphql_1.Args)('createCategoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categories_input_1.CreateCategoryInput]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "createCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => categories_schema_1.Category),
    __param(0, (0, graphql_1.Args)('categoryId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('updateCategoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, categories_input_1.CreateCategoryInput]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "updateCategory", null);
__decorate([
    (0, graphql_1.Mutation)(() => categories_schema_1.Category),
    __param(0, (0, graphql_1.Args)('categoryId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoriesResolver.prototype, "removeCategory", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_categories_output_1.PaginatedCategories),
    __param(0, (0, graphql_1.Args)('page', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('search', { type: () => String, nullable: true })),
    __param(3, (0, graphql_1.Args)('status', { type: () => String, nullable: true })),
    __param(4, (0, graphql_1.Args)('startDate', { type: () => String, nullable: true })),
    __param(5, (0, graphql_1.Args)('endDate', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], CategoriesResolver.prototype, "categoriesPaginated", null);
exports.CategoriesResolver = CategoriesResolver = __decorate([
    (0, graphql_1.Resolver)(() => categories_schema_1.Category),
    __metadata("design:paramtypes", [caategories_service_1.CategoriesService])
], CategoriesResolver);
//# sourceMappingURL=categories.resolver.js.map