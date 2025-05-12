"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const students_module_1 = require("./Domain/students.module");
const datasource_1 = require("./Infrastrutcure/database/datasource");
const students_controller_1 = require("./Presentation/students.controller");
const datasourceFuc_1 = require("./Infrastrutcure/database/datasourceFuc");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(datasource_1.dataSource.options),
            typeorm_1.TypeOrmModule.forRoot({ ...datasourceFuc_1.dataSourceFUC.options, name: 'FUC' }),
            students_module_1.StudentsModule,
        ],
        controllers: [students_controller_1.StudentsController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map