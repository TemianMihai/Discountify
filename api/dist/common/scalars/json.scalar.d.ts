import { CustomScalar } from "@nestjs/graphql";
export declare class JSONObject {
}
export declare class JSONObjectScalar implements CustomScalar<object, object> {
    description: string;
    parseValue(value: object): object;
    serialize(value: object): object;
    parseLiteral(ast: any): object;
}
