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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const customer_schema_1 = require("./entities/customer.schema");
const common_2 = require("@nestjs/common");
let CustomersService = class CustomersService {
    constructor(customerModel) {
        this.customerModel = customerModel;
    }
    async create(createCustomerInput) {
        const existing = await this.customerModel.findOne({ phone: createCustomerInput.phone });
        if (existing) {
            throw new common_2.ConflictException('Customer with this phone number already exists');
        }
        const lastCustomer = await this.customerModel.findOne().sort({ customerId: -1 }).lean();
        const nextId = lastCustomer?.customerId ? lastCustomer.customerId + 1 : 1001;
        const createdCustomer = new this.customerModel({
            ...createCustomerInput,
            customerId: nextId,
            createdAt: new Date(),
        });
        const result = await createdCustomer.save();
        return result;
    }
    async updateByCustomerId(customerId, updateData) {
        if (updateData.phone) {
            const exists = await this.customerModel.findOne({
                phone: updateData.phone,
                customerId: { $ne: customerId }
            });
            if (exists)
                throw new Error("Phone already in use by another customer");
        }
        return this.customerModel.findOneAndUpdate({ customerId }, { $set: updateData }, { new: true }).exec();
    }
    async removeByCustomerId(customerId) {
        return this.customerModel.findOneAndDelete({ customerId }).exec();
    }
    async findAll() {
        const cacheKey = 'all_customers';
        const customers = await this.customerModel.find().lean();
        return customers;
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
                                input: { $toString: "$customerId" },
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
        const cacheKey = `customers_page_${page}_limit_${limit}_search_${search || ''}_status_${status || ''}_sortBy_${sortBy}_sortOrder_${sortOrder}_start_${startDate || ''}_end_${endDate || ''}`;
        const data = await this.customerModel
            .find(filter)
            .sort(sort)
            .hint({ [sortBy]: 1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean()
            .exec();
        const total = await this.customerModel.countDocuments(filter);
        const result = { data, total };
        return result;
    }
    async findByPhone(phone) {
        return this.customerModel.findOne({ phone }).exec();
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(customer_schema_1.Customer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CustomersService);
//# sourceMappingURL=customers.service.js.map