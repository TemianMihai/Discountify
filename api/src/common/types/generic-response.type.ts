import { Field, ObjectType } from "@nestjs/graphql";
import { MutationStatus } from "../../constants";

@ObjectType()
export class GenericResponseType {
  @Field((type) => MutationStatus)
  status: MutationStatus;

  @Field({ nullable: true })
  reason?: string;
}

@ObjectType()
export class EntityIDResponseType {
  @Field()
  id: string;
}
