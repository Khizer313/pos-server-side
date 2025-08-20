// CustomersService wo service hai jo business logic aur database se baat karti hai.
// Ye file actual database se interaction karti hai using Mongoose.



import { Inject, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose'; // Ye hamen Mongoose models ko inject karne mein madad karta hai
import { Model } from 'mongoose'; // Mongoose se Model type import kiya gaya hai
import { Customer, CustomerDocument } from './entities/customer.schema';// Customer schema aur uska document type import kiya gaya hai
import { CreateCustomerInput } from './dto/customer.input';// DTO file se input type import kiya gaya hai jo GraphQL ya REST se aata hai
import { ConflictException } from '@nestjs/common';



// Ye decorator batata hai ke ye class ek injectable service hai

@Injectable()
export class CustomersService {
  constructor(
     // constructor mein Customer model inject kiya gaya hai
    // is model se hum MongoDB ke operations (find, save, etc.) perform karte hain
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {
    
  }



//   "create()" method new customer data ko MongoDB mein save karta hai.
async create(createCustomerInput: CreateCustomerInput): Promise<Customer> {
  const existing = await this.customerModel.findOne({ phone: createCustomerInput.phone });

 if (existing) {
  throw new ConflictException('Customer with this phone number already exists');
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


// updaing/editing single row
// Update by customerId
async updateByCustomerId(customerId: number, updateData: Partial<Customer>): Promise<Customer | null> {
  if (updateData.phone) {
    const exists = await this.customerModel.findOne({
      phone: updateData.phone,
      customerId: { $ne: customerId }
    });
    if (exists) throw new Error("Phone already in use by another customer");
  }

  return this.customerModel.findOneAndUpdate(
    { customerId },
    { $set: updateData },
    { new: true }
  ).exec();
}


//deleting a single row
async removeByCustomerId(customerId: number): Promise<Customer | null> {
  return this.customerModel.findOneAndDelete({ customerId }).exec();
}



  async findAll(): Promise<Customer[]> {

  const cacheKey = 'all_customers';
  const customers = await this.customerModel.find().lean();
  return customers;  

}




// paginating 
async findPaginated(
  page: number,
  limit: number,
  search?: string,
  status?: string,
  sortBy: string = 'createdAt',
  startDate?: string,
  endDate?: string,
  sortOrder: 'asc' | 'desc' = 'desc',
): Promise<{ data: Customer[]; total: number }> {
  const filter: any = {};

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
  const start = new Date(startDate); // "2025-07-25" => 2025-07-25T00:00:00.000Z
  filter.createdAt.$gte = start;
}
if (endDate) {
  // Set to next day midnight so that end date is inclusive
  const end = new Date(endDate);
  end.setDate(end.getDate() + 1);
  filter.createdAt.$lt = end; // less than next day
}



  if (status) {
    filter.status = status;
  }

  const sort: any = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // 🔑 Generate unique cache key based on all input parameters
  const cacheKey = `customers_page_${page}_limit_${limit}_search_${search || ''}_status_${status || ''}_sortBy_${sortBy}_sortOrder_${sortOrder}_start_${startDate || ''}_end_${endDate || ''}`;


  // Not cached? Fetch from DB
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

  // Cache the result (TTL: 6 hours here, adjust as needed)

  return result;
}








// async findPaginated(
//   page: number,
//   limit: number,
//   search?: string,
//   status?: string,
//   sortBy?: string,
//   sortOrder?: string,
// ): Promise<{ data: Customer[]; total: number }> {
//   const filter: any = {};

//   if (search) {
//     filter.$or = [
//       { name: { $regex: search, $options: 'i' } },
//       { phone: { $regex: search, $options: 'i' } },
//     ];
//   }

//   if (status) {
//     filter.status = status;
//   }

//   const sort: any = {};
//   if (sortBy) {
//     sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
//   }

//   const data = await this.customerModel
//     .find(filter)
//     .sort(sort)
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .exec();

//   const total = await this.customerModel.countDocuments(filter);

//   return { data, total };
// }








// By phone
  


async findByPhone(phone: string): Promise<Customer | null> {
    // Fetch full customer document (projection removed)
    return this.customerModel.findOne({ phone }).exec();
  }


}
