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
exports.VariationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const variations_services_1 = require("./variations.services");
const variations_schema_1 = require("./entities/variations.schema");
const variations_input_1 = require("./dto/variations.input");
const paginated_variations_output_1 = require("./dto/paginated-variations.output");
let VariationsResolver = class VariationsResolver {
    constructor(variationsService) {
        this.variationsService = variationsService;
    }
    findAll() {
        return this.variationsService.findAll();
    }
    createVariation(input) {
        return this.variationsService.create(input);
    }
    updateVariation(variationId, input) {
        return this.variationsService.updateByVariationId(variationId, input);
    }
    removeVariation(variationId) {
        return this.variationsService.removeByVariationId(variationId);
    }
    async variationsPaginated(page, limit, search, status, startDate, endDate) {
        return this.variationsService.findPaginated(page, limit, search, status, startDate, endDate);
    }
};
exports.VariationsResolver = VariationsResolver;
__decorate([
    (0, graphql_1.Query)(() => [variations_schema_1.Variation], { name: 'variations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VariationsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => variations_schema_1.Variation),
    __param(0, (0, graphql_1.Args)('createVariationInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [variations_input_1.CreateVariationInput]),
    __metadata("design:returntype", void 0)
], VariationsResolver.prototype, "createVariation", null);
__decorate([
    (0, graphql_1.Mutation)(() => variations_schema_1.Variation),
    __param(0, (0, graphql_1.Args)('variationId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('updateVariationInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, variations_input_1.CreateVariationInput]),
    __metadata("design:returntype", void 0)
], VariationsResolver.prototype, "updateVariation", null);
__decorate([
    (0, graphql_1.Mutation)(() => variations_schema_1.Variation),
    __param(0, (0, graphql_1.Args)('variationId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VariationsResolver.prototype, "removeVariation", null);
__decorate([
    (0, graphql_1.Query)(() => paginated_variations_output_1.PaginatedVariations),
    __param(0, (0, graphql_1.Args)('page', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('search', { type: () => String, nullable: true })),
    __param(3, (0, graphql_1.Args)('status', { type: () => String, nullable: true })),
    __param(4, (0, graphql_1.Args)('startDate', { type: () => String, nullable: true })),
    __param(5, (0, graphql_1.Args)('endDate', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], VariationsResolver.prototype, "variationsPaginated", null);
exports.VariationsResolver = VariationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => variations_schema_1.Variation),
    __metadata("design:paramtypes", [variations_services_1.VariationsService])
], VariationsResolver);
//# sourceMappingURL=variations.resolvers.js.map