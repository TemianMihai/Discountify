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
exports.BasicStrategy = void 0;
const passport_http_1 = require("passport-http");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
let BasicStrategy = class BasicStrategy extends passport_1.PassportStrategy(passport_http_1.BasicStrategy) {
    constructor(configService) {
        super({
            passReqToCallback: true
        });
        this.configService = configService;
        this.validate = async (req, username, password) => {
            if (this.configService.get("ADMIN_HTTP_BASIC_USER") === username &&
                this.configService.get("ADMIN_HTTP_BASIC_PASS") === password) {
                return true;
            }
            throw new common_1.UnauthorizedException();
        };
    }
};
BasicStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BasicStrategy);
exports.BasicStrategy = BasicStrategy;
//# sourceMappingURL=basic.strategy.js.map