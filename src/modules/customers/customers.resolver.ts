// Yeh file GraphQL client (frontend) se aane wali "customers" related queries aur mutations ko handle karti hai,aur unhe (CustomersService) ko forward karti hai jo asal database operations karta hai.Imported files (DTO, schema, service) ke zariye yeh resolver sirf request/response ka brcustomerIdge ban kar kaam karta hai.
// Yeh sirf data ko agey forward karta hai — khud kuch nahi karta.



import { Resolver, Query, Mutation, Args, Int  } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.schema';
import { CreateCustomerInput } from './dto/customer.input';
import { PaginatedCustomers } from './dto/paginated-customers.output';




// {@Resolve} + {CustomerResolver} Matlab, jab GraphQL ke andar Customer type ka koi query ya mutation aaye, to yeh resolver use karega.
@Resolver(() => Customer)
export class CustomersResolver {
  // {constructor}Iska matlab hai ke yeh class CustomersService ko apne andar inject kar rahi hai.CustomersService mein saara logic hota hai, jaise data ko database se lana, save karna, etc.Resolver ka kaam sirf frontend se request lena aur service ko forward karna hota hai.
 
  constructor(private readonly customersService: CustomersService) {}


  
 // {@Query} Iska matlab kh ye method graphql query ko handle kary ga, and '() => [Customer]'ka matlab hai ke yeh query ek array of Customer objects return karegi.
  @Query(() => [Customer], { name: 'customers' })
  // "findAll()" method customersService.findAll() call karta hai jo database se saare customers return karta hai.
  findAll() {
    return this.customersService.findAll();
  }


@Query(() => Customer, { name: 'customerByPhone' })
getCustomerByPhone(@Args('phone') phone: string) {
  return this.customersService.findByPhone(phone);
}

  

  // {@Mutation} data modify krny mi use hora hy, mary case mi naya customer create karny ky kam araha hy , "() => Customer" matlab yeh mutation ek Customer object return karegi, jo naya bana customer hoga.
  @Mutation(() => Customer)
  createCustomer(
    // @Args('createCustomerInput') se yeh argument GraphQL mutation se lega, jo CreateCustomerInput type ka hoga.
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    // Method customersService.create(createCustomerInput) call karta hai jo naya customer database mein save karega.
    return this.customersService.create(createCustomerInput);
    
  }


  // updating/editin single row
  @Mutation(() => Customer)
  updateCustomer(
    @Args('customerId', { type: () => Int }) customerId: number,
    @Args('updateCustomerInput') updateCustomerInput: CreateCustomerInput,
  ) {
    return this.customersService.updateByCustomerId(customerId, updateCustomerInput);
  }


// deleting single row
  @Mutation(() => Customer)
  removeCustomer(@Args('customerId', { type: () => Int }) customerId: number) {
    return this.customersService.removeByCustomerId(customerId);
  }




// paginating
@Query(() => PaginatedCustomers)
async customersPaginated(
  @Args('page', { type: () => Int }) page: number,
  @Args('limit', { type: () => Int }) limit: number,
  @Args('search', { type: () => String, nullable: true }) search?: string,
  @Args('status', { type: () => String, nullable: true }) status?: string,
  @Args('startDate', { type: () => String, nullable: true }) startDate?: string,
  @Args('endDate', { type: () => String, nullable: true }) endDate?: string,
) {
  return this.customersService.findPaginated(page, limit, search, status, 'createdAt', startDate, endDate);
}


// @Query(() => PaginatedCustomers)
// async customersPaginated(
//   @Args('page', { type: () => Int }) page: number,
//   @Args('limit', { type: () => Int }) limit: number,
//   @Args('search', { type: () => String, nullable: true }) search?: string,
//   @Args('status', { type: () => String, nullable: true }) status?: string,
// ): Promise<{ data: Customer[]; total: number }> {
//   return this.customersService.findPaginated(page, limit, search, status);
// }

  // @Query(() => PaginatedCustomers)
  // async customersPaginated(
  //   @Args('page', { type: () => Int }) page: number,
  //   @Args('limit', { type: () => Int }) limit: number,
  //   @Args('search', { type: () => String, nullable: true }) search?: string,
  //   @Args('status', { type: () => String, nullable: true }) status?: string,
  //   @Args('sortBy', { type: () => String, nullable: true }) sortBy?: string,
  //   @Args('sortOrder', { type: () => String, nullable: true }) sortOrder?: string,
  // ) {
  //   return this.customersService.findPaginated(page, limit, search, status, sortBy, sortOrder);
  // }
}
