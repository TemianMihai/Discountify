import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ActivateUserInput {
  @Field()
  activationKey: string;
}
