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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const brands_schema_1 = require("./entities/brands.schema");
let BrandsService = class BrandsService {
    constructor(brandModel) {
        this.brandModel = brandModel;
    }
    async create(createBrandInput) {
        const existing = await this.brandModel.findOne({ name: createBrandInput.name });
        if (existing) {
            throw new common_1.ConflictException('Brand with this name already exists');
        }
        const lastBrand = await this.brandModel.findOne().sort({ brandId: -1 }).lean();
        const nextId = lastBrand?.brandId ? lastBrand.brandId + 1 : 1001;
        const createdBrand = new this.brandModel({
            ...createBrandInput,
            brandId: nextId,
            createdAt: new Date(),
        });
        return await createdBrand.save();
    }
    async updateByBrandId(brandId, updateData) {
        return this.brandModel.findOneAndUpdate({ brandId }, { $set: updateData }, { new: true }).exec();
    }
    async removeByBrandId(brandId) {
        return this.brandModel.findOneAndDelete({ brandId }).exec();
    }
    async findAll() {
        return this.brandModel.find().lean();
    }
    async findPaginated(page, limit, search, status, startDate, endDate, sortBy = 'createdAt', sortOrder = 'desc') {
        const filter = {};
        if (search) {
            const terms = search.split(" ").filter(Boolean);
            filter.$and = terms.map(term => ({
                $or: [
                    { name: { $regex: `.*${term}.*`, $options: 'i' } },
                    { status: { $regex: `.*${term}.*`, $options: 'i' } },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $toString: "$brandId" },
                                regex: `.*${term}.*`,
                                options: "i"
                            }
                        }
                    },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
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
            if (!filter.createdAt)
                filter.createdAt = {};
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            filter.createdAt.$lt = end;
        }
        if (status) {
            filter.status = status;
        }
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        const data = await this.brandModel
            .find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()
            .exec();
        const total = await this.brandModel.countDocuments(filter);
        return { data, total };
    }
};
exports.BrandsService = BrandsService;
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(brands_schema_1.Brand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BrandsService);
//# sourceMappingURL=brands.service.js.map