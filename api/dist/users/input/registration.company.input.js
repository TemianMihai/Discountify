"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationCompanyInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let RegistrationCompanyInput = class RegistrationCompanyInput {
};
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], RegistrationCompanyInput.prototype, "email", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], RegistrationCompanyInput.prototype, "password", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], RegistrationCompanyInput.prototype, "companyName", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], RegistrationCompanyInput.prototype, "address", void 0);
RegistrationCompanyInput = __decorate([
    graphql_1.InputType()
], RegistrationCompanyInput);
exports.RegistrationCompanyInput = RegistrationCompanyInput;
//# sourceMappingURL=registration.company.input.js.map