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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoController = void 0;
const common_1 = require("@nestjs/common");
const info_service_1 = require("./info.service");
const common_2 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let InfoController = class InfoController {
    constructor(infoService) {
        this.infoService = infoService;
    }
    getSystemInfo() {
        return this.infoService.getSystemInfo();
    }
    listAllEndpointsSorted() {
        return this.infoService.listAllEndpointsSorted();
    }
    async getServerAndDatabaseTime() {
        return await this.infoService.getServerAndDatabaseTime();
    }
    getDatabaseInfo() {
        return this.infoService.getDatabaseInfo();
    }
    resetDatabase(request) {
        if (request.headers.authorization == process.env.DROPSCHEMA) {
            return this.infoService.resetDatabase();
        }
        throw new common_1.UnauthorizedException('Unauthorized');
    }
    dropDatabase(request) {
        if (request.headers.authorization == process.env.DROPSCHEMA) {
            return this.infoService.dropDatabase();
        }
        throw new common_1.UnauthorizedException('Unauthorized');
    }
    getPackageInfo() {
        return this.infoService.getPackageInfo();
    }
    getServerDomain(request) {
        const domain = `${request.protocol}://${request.get('host')}`;
        const info = {
            domain,
            protocol: request.protocol,
            host: request.get('host'),
            subdomain: request.subdomains[0],
            originalUrl: request.originalUrl,
            baseUrl: request.baseUrl,
            params: request.params,
            query: request.query,
            path: request.path,
            method: request.method,
            headers: request.headers,
            body: request.body,
            route: request.route,
        };
        return info;
    }
    getCookies(request) {
        const cookies = this.parseCookies(request.headers.cookie || '');
        return { cookies };
    }
    parseCookies(cookieHeader) {
        const cookies = {};
        cookieHeader.split(';').forEach((cookie) => {
            const [name, ...rest] = cookie.split('=');
            const value = rest.join('=').trim();
            if (name && value) {
                cookies[name.trim()] = decodeURIComponent(value);
            }
        });
        return cookies;
    }
    getAllEndpoints() {
        return this.infoService.listAllEndpoints();
    }
    async runMigrations() {
        return this.infoService.runMigrations();
    }
    async createEnv(envData) {
        try {
            const envFilePath = path.resolve(__dirname, '..', '..', '.env');
            fs.writeFileSync(envFilePath, envData, 'utf-8');
            const envContent = await this.infoService.readEnvFile();
            return envContent;
        }
        catch (error) {
            return {
                message: 'Error al crear el archivo .env',
                error: error.message,
            };
        }
    }
    async getEnvFile() {
        return this.infoService.readEnvFile();
    }
};
exports.InfoController = InfoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getSystemInfo", null);
__decorate([
    (0, common_1.Get)('system'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "listAllEndpointsSorted", null);
__decorate([
    (0, common_1.Get)('time'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "getServerAndDatabaseTime", null);
__decorate([
    (0, common_1.Get)('infoDatabase'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getDatabaseInfo", null);
__decorate([
    (0, common_1.Delete)('resetDatabase'),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "resetDatabase", null);
__decorate([
    (0, common_1.Delete)('dropDatabase'),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "dropDatabase", null);
__decorate([
    (0, common_1.Get)('package.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getPackageInfo", null);
__decorate([
    (0, common_1.Get)('domain'),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getServerDomain", null);
__decorate([
    (0, common_1.Get)('cookies'),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getCookies", null);
__decorate([
    (0, common_1.Get)('endpoints'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getAllEndpoints", null);
__decorate([
    (0, common_1.Post)('runMigrations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "runMigrations", null);
__decorate([
    (0, common_1.Post)('create-env'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "createEnv", null);
__decorate([
    (0, common_1.Get)('env'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "getEnvFile", null);
exports.InfoController = InfoController = __decorate([
    (0, common_1.Controller)('info'),
    __metadata("design:paramtypes", [info_service_1.InfoService])
], InfoController);
//# sourceMappingURL=info.controller.js.map