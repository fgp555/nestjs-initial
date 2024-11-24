"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoGuard = void 0;
const common_1 = require("@nestjs/common");
let InfoGuard = class InfoGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        const expectedPassword = atob('UDRzNVcwckRAMTIz');
        if (authHeader !== expectedPassword) {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
        return true;
    }
};
exports.InfoGuard = InfoGuard;
exports.InfoGuard = InfoGuard = __decorate([
    (0, common_1.Injectable)()
], InfoGuard);
//# sourceMappingURL=info.guard.js.map