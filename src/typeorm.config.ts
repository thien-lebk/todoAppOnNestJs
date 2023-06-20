import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config'

const dbConfig = config.get('db')

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url:'postgres://housemn_user:Qo95hwkARIxiO0mLfs9Si6qi4HDxm6Ky@dpg-ci88v598g3n3vm46s2k0-a.oregon-postgres.render.com/housemn?ssl=true',
    port: 5432,
    database: 'housemn',
    username: 'housemn_user',
    password: 'Qo95hwkARIxiO0mLfs9Si6qi4HDxm6Ky',
    entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
    migrationsRun: false,
    logging: true,
    migrationsTableName: "migration",
    migrations: [__dirname + '/migration/**/*.ts', __dirname + '/migration/**/*.js'],
    synchronize: true,
    cli: {
        migrationsDir: 'src/migration'
    }
}

export = typeOrmConfig