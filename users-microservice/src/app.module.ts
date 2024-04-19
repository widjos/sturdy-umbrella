import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Payment } from './typeorm/entities/Payment';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql_db',
    username: 'testuser',
    password: 'testuser123',
    database: 'nestjs_db',
    entities: [User,Payment],
    port: 3307,
    synchronize: true
  }),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
