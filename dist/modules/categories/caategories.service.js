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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const categories_schema_1 = require("./entities/categories.schema");
let CategoriesService = class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async create(createCategoryInput) {
        const existing = await this.categoryModel.findOne({ name: createCategoryInput.name });
        if (existing)
            throw new common_1.ConflictException('Category with this name already exists');
        const lastCategory = await this.categoryModel.findOne().sort({ categoryId: -1 }).lean();
        const nextId = lastCategory?.categoryId ? lastCategory.categoryId + 1 : 1001;
        const createdCategory = new this.categoryModel({
            ...createCategoryInput,
            categoryId: nextId,
            createdAt: new Date(),
        });
        return createdCategory.save();
    }
    async updateByCategoryId(categoryId, updateData) {
        if (updateData.name) {
            const exists = await this.categoryModel.findOne({
                name: updateData.name,
                categoryId: { $ne: categoryId }
            });
            if (exists)
                throw new Error("Category name already in use");
        }
        return this.categoryModel.findOneAndUpdate({ categoryId }, { $set: updateData }, { new: true }).exec();
    }
    async removeByCategoryId(categoryId) {
        return this.categoryModel.findOneAndDelete({ categoryId }).exec();
    }
    async findAll() {
        return this.categoryModel.find().lean();
    }
    async findPaginated(page, limit, search, status, sortBy = 'createdAt', startDate, endDate, sortOrder = 'desc') {
        const filter = {};
        if (search) {
            const terms = search.split(" ").filter(Boolean);
            filter.$and = terms.map(term => ({
                $or: [
                    { name: { $regex: `.*${term}.*`, $options: 'i' } },
                    { brandAssigned: { $regex: `.*${term}.*`, $options: 'i' } },
                    { status: { $regex: `.*${term}.*`, $options: 'i' } },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $toString: "$categoryId" },
                                regex: `.*${term}.*`,
                                options: "i"
                            }
                        }
                    },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt", timezone: "+05:00" } },
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
        if (status) {
            filter.status = status;
        }
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        const data = await this.categoryModel
            .find(filter)
            .sort(sort)
            .hint({ [sortBy]: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()
            .exec();
        const total = await this.categoryModel.countDocuments(filter);
        return { data, total };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(categories_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
//# sourceMappingURL=caategories.service.js.map