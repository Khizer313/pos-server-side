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
exports.VariationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const variations_schema_1 = require("./entities/variations.schema");
let VariationsService = class VariationsService {
    constructor(variationModel) {
        this.variationModel = variationModel;
    }
    async create(input) {
        const last = await this.variationModel.findOne().sort({ variationId: -1 }).lean();
        const nextId = last?.variationId ? last.variationId + 1 : 5001;
        const created = new this.variationModel({ ...input, variationId: nextId, createdAt: new Date() });
        return created.save();
    }
    async updateByVariationId(variationId, update) {
        return this.variationModel.findOneAndUpdate({ variationId }, { $set: update }, { new: true }).exec();
    }
    async removeByVariationId(variationId) {
        return this.variationModel.findOneAndDelete({ variationId }).exec();
    }
    async findAll() {
        return this.variationModel.find().lean();
    }
    async findPaginated(page, limit, search, status, startDate, endDate) {
        const filter = {};
        if (search)
            filter.name = { $regex: search, $options: 'i' };
        if (status)
            filter.status = status;
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate)
                filter.createdAt.$gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                filter.createdAt.$lte = end;
            }
        }
        const data = await this.variationModel
            .find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()
            .exec();
        const total = await this.variationModel.countDocuments(filter);
        return { data, total };
    }
};
exports.VariationsService = VariationsService;
exports.VariationsService = VariationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(variations_schema_1.Variation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VariationsService);
//# sourceMappingURL=variations.services.js.map