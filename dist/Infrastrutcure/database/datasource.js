"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const path_1 = require("path");
exports.dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'SIGIES',
    entities: [(0, path_1.join)(__dirname, '..', '..', 'Domain', 'entities', '*.entity.{ts,js}')],
    synchronize: false,
    migrations: [(0, path_1.join)(__dirname, '..', '..', '**', 'migrations', '**', '*.{js,ts}')],
};
exports.dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
//# sourceMappingURL=datasource.js.map