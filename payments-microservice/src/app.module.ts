import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './typeorm/entities/Payment';
import { User } from './typeorm/entities/User';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql_db',
    username: 'testuser',
    password: 'testuser123',
    database: 'nestjs_db',
    entities: [Payment,User],
    port: 3307,
    synchronize: true
  })
    ,PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
