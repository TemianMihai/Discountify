"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONObjectScalar = exports.JSONObject = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
class JSONObject {
}
exports.JSONObject = JSONObject;
let JSONObjectScalar = class JSONObjectScalar {
    constructor() {
        this.description = "JSONObject custom scalar type";
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.OBJECT) {
            return new Object(ast.value);
        }
        return null;
    }
};
JSONObjectScalar = __decorate([
    graphql_1.Scalar("JSONObject", (type) => JSONObject)
], JSONObjectScalar);
exports.JSONObjectScalar = JSONObjectScalar;
//# sourceMappingURL=json.scalar.js.map