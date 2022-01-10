import { Field, InputType } from '@nestjs/graphql'

import { Interest } from '../../constants'

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  story?: string

  @Field({ nullable: true })
  avatarUrl?: string

  @Field(() => [Interest], { nullable: true })
  interests?: Interest[]

}
