import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path'; // Asegúrate de importar 'join' desde 'path'

// Se asume que las variables de entorno se cargan correctamente (ej. con dotenv)

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'SIGIES',
    // entities: [__dirname + '/**/*.entity{.ts,.js}'], // Línea original problemática
    // Ruta de entidades corregida:
    // Esto escaneará desde el directorio 'dist' (o 'src' durante el desarrollo con ts-node) hacia abajo.
    // Para dist/Infrastrutcure/database/datasource.js, __dirname es dist/Infrastrutcure/database
    // Entonces, join(__dirname, '..', '..') apunta a 'dist/' (o 'src/' en desarrollo)
    entities: [join(__dirname, '..', '..', 'Domain', 'entities', '*.entity.{ts,js}')],
    synchronize: false, // Es una buena práctica para producción tenerlo en false
    // migrations: [__dirname + '/**/migrations/**/{.ts, .js}'], // Ruta de migraciones original, también podría necesitar ajuste
    // Una ruta de migraciones más robusta, similar a la de entidades:
    migrations: [join(__dirname, '..', '..', '**', 'migrations', '**', '*.{js,ts}')],
    // O si las migraciones siempre están en una ubicación específica relativa a dist, por ejemplo:
    // migrations: [join(__dirname, '..', '..', 'database', 'migrations', '*.{js,ts}')],
};

export const dataSource = new DataSource(dataSourceOptions);
