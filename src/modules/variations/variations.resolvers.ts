import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VariationsService } from './variations.services';
import { Variation } from './entities/variations.schema';
import { CreateVariationInput } from './dto/variations.input';
import { PaginatedVariations } from './dto/paginated-variations.output';

@Resolver(() => Variation)
export class VariationsResolver {
  constructor(private readonly variationsService: VariationsService) {}

  @Query(() => [Variation], { name: 'variations' })
  findAll() {
    return this.variationsService.findAll();
  }

  @Mutation(() => Variation)
  createVariation(@Args('createVariationInput') input: CreateVariationInput) {
    return this.variationsService.create(input);
  }

  @Mutation(() => Variation)
  updateVariation(
    @Args('variationId', { type: () => Int }) variationId: number,
    @Args('updateVariationInput') input: CreateVariationInput
  ) {
    return this.variationsService.updateByVariationId(variationId, input);
  }

  @Mutation(() => Variation)
  removeVariation(@Args('variationId', { type: () => Int }) variationId: number) {
    return this.variationsService.removeByVariationId(variationId);
  }

@Query(() => PaginatedVariations)
async variationsPaginated(
  @Args('page', { type: () => Int }) page: number,
  @Args('limit', { type: () => Int }) limit: number,
  @Args('search', { type: () => String, nullable: true }) search?: string,
  @Args('status', { type: () => String, nullable: true }) status?: string,
  @Args('startDate', { type: () => String, nullable: true }) startDate?: string,
  @Args('endDate', { type: () => String, nullable: true }) endDate?: string,
) {
  return this.variationsService.findPaginated(page, limit, search, status, startDate, endDate);
}

}
