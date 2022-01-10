import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind } from "graphql";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class JSONObject {}

@Scalar("JSONObject", (type) => JSONObject)
export class JSONObjectScalar implements CustomScalar<object, object> {
  description = "JSONObject custom scalar type";

  parseValue(value: object): object {
    return value; // this is the value a client sends to the server
  }

  serialize(value: object): object {
    return value; // this is the value the server sends to the client
  }

  parseLiteral(ast: any): object {
    if (ast.kind === Kind.OBJECT) {
      // eslint-disable-next-line no-new-object
      return new Object(ast.value);
    }
    return null;
  }
}
