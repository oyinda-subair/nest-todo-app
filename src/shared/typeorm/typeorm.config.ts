import { DataSource } from 'typeorm';
import { service } from '../../common/utils/app.config';

export default new DataSource({
  type: 'postgres',
  host: service.get<string>('DATABASE_HOST'),
  port: service.get<number>('DATABASE_PORT'),
  database: service.get<string>('DATABASE_NAME'),
  username: service.get<string>('DATABASE_USER'),
  password: service.get<string>('DATABASE_PASSWORD'),
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'typeorm_migrations',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  logging: true,
});
