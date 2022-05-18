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
exports.RolesGuard = void 0;
const core_1 = require("../../core");
const repository_1 = require("../../repository");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const core_2 = require("@nestjs/core");
let RolesGuard = class RolesGuard {
    constructor(reflector, userRepository) {
        this.reflector = reflector;
        this.userRepository = userRepository;
    }
    async canActivate(context) {
        const roles = this.reflector.get(core_1.ROLE_CONTEXT, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = await this.userRepository.findOne({
            username: request.user.username,
        });
        request.user = user;
        if (roles.includes(user.role))
            return true;
        throw new common_2.HttpException(core_1.AUTH_MESSAGE.USER.ROLE, common_1.HttpStatus.UNAUTHORIZED);
    }
};
RolesGuard = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [core_2.Reflector,
        repository_1.UserRepository])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map