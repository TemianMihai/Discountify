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
exports.DiscountModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const company_model_1 = require("../../users/models/company.model");
let DiscountModel = class DiscountModel {
};
__decorate([
    graphql_1.Field({ nullable: false }),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], DiscountModel.prototype, "id", void 0);
__decorate([
    graphql_1.Field({ nullable: false }),
    typeorm_1.Column('varchar', { length: 255 }),
    __metadata("design:type", String)
], DiscountModel.prototype, "name", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], DiscountModel.prototype, "description", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column('integer', { nullable: true, name: 'initial_price' }),
    __metadata("design:type", Number)
], DiscountModel.prototype, "initialPrice", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column('text', { nullable: true, name: 'discount_percentage' }),
    __metadata("design:type", String)
], DiscountModel.prototype, "discountPercentage", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typeorm_1.Column('boolean', { default: false, name: 'is_visible' }),
    __metadata("design:type", Boolean)
], DiscountModel.prototype, "isVisible", void 0);
__decorate([
    typeorm_1.Column({ name: 'company_id', nullable: true }),
    __metadata("design:type", String)
], DiscountModel.prototype, "companyID", void 0);
__decorate([
    graphql_1.Field({ nullable: false }),
    typeorm_1.CreateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP(6)',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], DiscountModel.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field({ nullable: false }),
    typeorm_1.UpdateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], DiscountModel.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field(() => company_model_1.CompanyModel, { nullable: true }),
    typeorm_1.ManyToOne(() => company_model_1.CompanyModel, (company) => company.discounts, { primary: true, onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'company_id' }),
    __metadata("design:type", company_model_1.CompanyModel)
], DiscountModel.prototype, "company", void 0);
DiscountModel = __decorate([
    graphql_1.ObjectType(),
    typeorm_1.Entity({ name: 'discounts' })
], DiscountModel);
exports.DiscountModel = DiscountModel;
//# sourceMappingURL=discount.model.js.map