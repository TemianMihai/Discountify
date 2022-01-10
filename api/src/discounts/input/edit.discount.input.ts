import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class EditDiscountInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  initialPrice?: string

  @Field({ nullable: true })
  discountPercentage?: string

  @Field({ nullable: true })
  isVisible?: boolean
}
