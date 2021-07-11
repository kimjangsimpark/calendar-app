import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './users/user.entity';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { AppTemplateController } from './app-template.controller';

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
    UsersModule,
  ],
  controllers: [AppController, AppTemplateController],
  providers: [AppService],
})
export class AppModule {
  public constructor() {
    dotenv.config();
  }
}
