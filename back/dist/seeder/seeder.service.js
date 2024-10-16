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
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
let SeederService = class SeederService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async seed() {
        const usersData = [
            {
                email: 'john.doe@example.com',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
            },
            {
                email: 'jane.doe@example.com',
                password: 'password123',
                firstName: 'Jane',
                lastName: 'Doe',
            },
        ];
        const savedUsers = [];
        for (const userData of usersData) {
            const user = await this.userRepository.save(userData);
            savedUsers.push(user);
        }
        console.log('Datos de prueba creados con éxito');
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SeederService);
//# sourceMappingURL=seeder.service.js.map