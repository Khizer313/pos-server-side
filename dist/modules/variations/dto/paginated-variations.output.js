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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedVariations = void 0;
const graphql_1 = require("@nestjs/graphql");
const variations_schema_1 = require("../entities/variations.schema");
let PaginatedVariations = class PaginatedVariations {
};
exports.PaginatedVariations = PaginatedVariations;
__decorate([
    (0, graphql_1.Field)(() => [variations_schema_1.Variation]),
    __metadata("design:type", Array)
], PaginatedVariations.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginatedVariations.prototype, "total", void 0);
exports.PaginatedVariations = PaginatedVariations = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedVariations);
//# sourceMappingURL=paginated-variations.output.js.map