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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const products_schema_1 = require("./entities/products.schema");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(createProductInput) {
        const existing = await this.productModel.findOne({ name: createProductInput.name });
        if (existing)
            throw new common_1.ConflictException('Product with this name already exists');
        const last = await this.productModel.findOne().sort({ productId: -1 }).lean();
        const nextId = last?.productId ? last.productId + 1 : 2001;
        const created = new this.productModel({
            ...createProductInput,
            productId: nextId,
            createdAt: new Date(),
        });
        return created.save();
    }
    async updateByProductId(productId, updateData) {
        return this.productModel.findOneAndUpdate({ productId }, { $set: updateData }, { new: true }).exec();
    }
    async removeByProductId(productId) {
        return this.productModel.findOneAndDelete({ productId }).exec();
    }
    async findAll() {
        return this.productModel.find().lean();
    }
    async findPaginated(page, limit, search, status, sortBy = 'createdAt', startDate, endDate, sortOrder = 'desc') {
        const filter = {};
        if (search) {
            const terms = search.split(" ").filter(Boolean);
            filter.$and = terms.map(term => ({
                $or: [
                    { name: { $regex: `.*${term}.*`, $options: 'i' } },
                    { categoryAssigned: { $regex: `.*${term}.*`, $options: 'i' } },
                    { status: { $regex: `.*${term}.*`, $options: 'i' } },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $toString: "$productId" },
                                regex: `.*${term}.*`,
                                options: "i"
                            }
                        }
                    }
                ]
            }));
        }
        if (startDate) {
            filter.createdAt = {};
            const start = new Date(startDate);
            filter.createdAt.$gte = start;
        }
        if (endDate) {
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            filter.createdAt.$lt = end;
        }
        if (status)
            filter.status = status;
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        const data = await this.productModel
            .find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const total = await this.productModel.countDocuments(filter);
        return { data, total };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map