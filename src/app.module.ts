import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      synchronize: true,
      driver: require('sqlite3'),
      entities: [User, Report],
    }),
  ],
})
export class AppModule {}
