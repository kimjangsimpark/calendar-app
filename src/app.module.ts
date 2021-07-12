import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import dotenv from 'dotenv';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { ScheduleModule } from './schedule/schedule.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
      }),
    ),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './test-db.sql',
      // host: process.env.DB_HOST,
      // port: Number(process.env.DB_PORT),
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ScheduleModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  public constructor() {
    dotenv.config();
  }
}
