"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const morgan = require("morgan");
const cors = require("cors");
const path_1 = require("path");
const seeder_service_1 = require("./seeder/seeder.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const seederService = app.get(seeder_service_1.SeederService);
    await seederService.seed();
    app.setGlobalPrefix('api');
    app.use(cors());
    app.use(morgan('dev'));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', '_doc', 'html'), {
        prefix: '/html/',
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', '..', 'front'), {
        prefix: '/',
    });
    await app.listen(3000);
    common_1.Logger.log(`Application is running on: http://localhost:3000`);
}
bootstrap();
//# sourceMappingURL=main.js.map