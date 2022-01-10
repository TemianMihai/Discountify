import { CustomScalar, Scalar } from "@nestjs/graphql";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Any {}

@Scalar("Any", (type) => Any)
export class AnyScalar implements CustomScalar<any, any> {
  description = "Any custom scalar type";

  parseValue(value: any): any {
    return value; // value from the client
  }

  serialize(value: any): any {
    return value; // value sent to the client
  }

  parseLiteral(ast: any): any {
    return ast.value;
  }
}
