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
exports.CreateSaleInput = exports.SaleItemInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let SaleItemInput = class SaleItemInput {
};
exports.SaleItemInput = SaleItemInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], SaleItemInput.prototype, "productId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SaleItemInput.prototype, "productName", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], SaleItemInput.prototype, "ctn", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], SaleItemInput.prototype, "pieces", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], SaleItemInput.prototype, "quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], SaleItemInput.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], SaleItemInput.prototype, "total", void 0);
exports.SaleItemInput = SaleItemInput = __decorate([
    (0, graphql_1.InputType)()
], SaleItemInput);
let CreateSaleInput = class CreateSaleInput {
};
exports.CreateSaleInput = CreateSaleInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateSaleInput.prototype, "customerId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSaleInput.prototype, "invoiceNo", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSaleInput.prototype, "date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSaleInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSaleInput.prototype, "paymentMethod", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSaleInput.prototype, "notes", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateSaleInput.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => [SaleItemInput]),
    __metadata("design:type", Array)
], CreateSaleInput.prototype, "items", void 0);
exports.CreateSaleInput = CreateSaleInput = __decorate([
    (0, graphql_1.InputType)()
], CreateSaleInput);
//# sourceMappingURL=sales.input.js.map