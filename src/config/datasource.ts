import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import parseBoolean from '@eturino/ts-parse-boolean';

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ["dist/src/migrations/*{.ts,.js}"],
    migrationsTableName: `${process.env.MIGRATIONS_TABLE_NAME}`,
    migrationsRun: parseBoolean(`${process.env.DATABASE_MIGRATIONS_RUN}`),
    cli: {
        migrationsDir: `${process.env.MIGRATIONS_DIR}`,
    },
    seeds: ["src/seeding/seeds/**/*{.ts,.js}"],
    factories: ["src/seeding/factories/**/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
}

export default registerAs('datasource', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);