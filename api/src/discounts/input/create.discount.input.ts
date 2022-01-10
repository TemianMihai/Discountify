import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateDiscountInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field()
  initialPrice: string

  @Field()
  discountPercentage: string

  @Field()
  isVisible: boolean
}
