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
exports.SuppliersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const suppliers_schema_1 = require("./entities/suppliers.schema");
let SuppliersService = class SuppliersService {
    constructor(supplierModel) {
        this.supplierModel = supplierModel;
    }
    async create(createSupplierInput) {
        const existing = await this.supplierModel.findOne({ phone: createSupplierInput.phone });
        if (existing)
            throw new common_1.ConflictException('Supplier with this phone number already exists');
        const lastSupplier = await this.supplierModel.findOne().sort({ supplierId: -1 }).lean();
        const nextId = lastSupplier?.supplierId ? lastSupplier.supplierId + 1 : 2001;
        const createdSupplier = new this.supplierModel({
            ...createSupplierInput,
            supplierId: nextId,
            createdAt: new Date(),
        });
        return createdSupplier.save();
    }
    async updateBySupplierId(supplierId, updateData) {
        if (updateData.phone) {
            const exists = await this.supplierModel.findOne({
                phone: updateData.phone,
                supplierId: { $ne: supplierId }
            });
            if (exists)
                throw new Error("Phone already in use by another supplier");
        }
        return this.supplierModel.findOneAndUpdate({ supplierId }, { $set: updateData }, { new: true }).exec();
    }
    async removeBySupplierId(supplierId) {
        return this.supplierModel.findOneAndDelete({ supplierId }).exec();
    }
    async findAll() {
        return this.supplierModel.find().lean();
    }
    async findPaginated(page, limit, search, status, sortBy = 'createdAt', startDate, endDate, sortOrder = 'desc') {
        const filter = {};
        if (search) {
            const terms = search.split(" ").filter(Boolean);
            filter.$and = terms.map(term => ({
                $or: [
                    { name: { $regex: `.*${term}.*`, $options: 'i' } },
                    { phone: { $regex: `.*${term}.*`, $options: 'i' } },
                    { balance: { $regex: `.*${term}.*`, $options: 'i' } },
                    { status: { $regex: `.*${term}.*`, $options: 'i' } },
                    {
                        $expr: {
                            $regexMatch: {
                                input: { $toString: "$supplierId" },
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
        const data = await this.supplierModel
            .find(filter)
            .sort(sort)
            .hint({ [sortBy]: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()
            .exec();
        const total = await this.supplierModel.countDocuments(filter);
        return { data, total };
    }
    async findByPhone(phone) {
        return this.supplierModel.findOne({ phone }).exec();
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(suppliers_schema_1.Supplier.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map