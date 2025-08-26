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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sales_schema_1 = require("./entities/sales.schema");
let SalesService = class SalesService {
    constructor(saleModel) {
        this.saleModel = saleModel;
    }
    async create(createSaleInput) {
        const lastSale = await this.saleModel.findOne().sort({ saleId: -1 }).lean();
        const nextId = lastSale?.saleId ? lastSale.saleId + 1 : 1001;
        const createdSale = new this.saleModel({
            ...createSaleInput,
            saleId: nextId,
            createdAt: new Date(),
        });
        return createdSale.save();
    }
    async updateBySaleId(saleId, updateData) {
        return this.saleModel.findOneAndUpdate({ saleId }, { $set: updateData }, { new: true }).exec();
    }
    async removeBySaleId(saleId) {
        return this.saleModel.findOneAndDelete({ saleId }).exec();
    }
    async findAll() {
        return this.saleModel.find().lean();
    }
    async findBySaleId(saleId) {
        return this.saleModel.findOne({ saleId }).lean();
    }
    async findPaginated(page, limit, search, status, startDate, endDate, paymentMethod) {
        const filter = {};
        if (search) {
            const terms = search.split(' ').filter(Boolean);
            filter.$and = terms.map(term => ({
                $or: [
                    { invoiceNo: { $regex: term, $options: 'i' } },
                    { status: { $regex: term, $options: 'i' } },
                    {
                        $expr: {
                            $regexMatch: { input: { $toString: '$saleId' }, regex: term, options: 'i' },
                        },
                    },
                ],
            }));
        }
        if (status)
            filter.status = status;
        if (paymentMethod)
            filter.paymentMethod = paymentMethod;
        if (startDate) {
            filter.createdAt = { ...filter.createdAt, $gte: new Date(startDate) };
        }
        if (endDate) {
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            filter.createdAt = { ...filter.createdAt, $lt: end };
        }
        const data = await this.saleModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const total = await this.saleModel.countDocuments(filter);
        return { data, total };
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(sales_schema_1.Sale.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SalesService);
//# sourceMappingURL=sales.services.js.map