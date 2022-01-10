import { CustomScalar } from "@nestjs/graphql";
export declare class Any {
}
export declare class AnyScalar implements CustomScalar<any, any> {
    description: string;
    parseValue(value: any): any;
    serialize(value: any): any;
    parseLiteral(ast: any): any;
}
