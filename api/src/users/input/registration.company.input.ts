import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RegistrationCompanyInput {
  @Field()
  email: string

  @Field()
  password: string

  @Field()
  companyName: string

  @Field()
  address: string
}
