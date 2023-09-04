// src/app.module.ts

import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './typeorm/office.entity';
import { APP_PIPE } from '@nestjs/core';
import { OfficeController } from './office/offices.controller';
import { OfficeModule } from './office/office.module';
import { Employees } from './typeorm/employees.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [OfficeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'classicmodels',
      entities: [Office, Employees],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Office, Employees]),
    AuthModule, UsersModule
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }],
})
export class AppModule { }
