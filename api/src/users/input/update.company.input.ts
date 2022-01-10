import { Field, InputType } from '@nestjs/graphql'

import { Interest } from '../../constants'

@InputType()
export class UpdateCompanyInput {
  @Field({ nullable: true })
  companyName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  address?: string

  @Field({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  thumbnailUrl?: string

  @Field(() => [Interest], { nullable: true })
  interests?: Interest[]

}
