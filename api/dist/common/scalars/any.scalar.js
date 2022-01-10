"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyScalar = exports.Any = void 0;
const graphql_1 = require("@nestjs/graphql");
class Any {
}
exports.Any = Any;
let AnyScalar = class AnyScalar {
    constructor() {
        this.description = "Any custom scalar type";
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
    parseLiteral(ast) {
        return ast.value;
    }
};
AnyScalar = __decorate([
    graphql_1.Scalar("Any", (type) => Any)
], AnyScalar);
exports.AnyScalar = AnyScalar;
//# sourceMappingURL=any.scalar.js.map