import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "src/typeorm/entities/Payment";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dtos";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { User } from "src/typeorm/entities/User";

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        @Inject('NATS_SERVICE') private natsClient: ClientProxy
    ){}

    async createPayment( {userId, ...createPaymentDto}:CreatePaymentDto){
        const user = await lastValueFrom<User>(this.natsClient.send( { cmd: 'getUserById'}, { userId}));

        console.log(user);
        if(user){
            const newPayment = this.paymentRepository.create({
                ...createPaymentDto,
                user,
            });
            console.log(newPayment);
            return this.paymentRepository.save(newPayment);
        }
        return null;

    }
}