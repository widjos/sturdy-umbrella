import { Controller, Inject } from "@nestjs/common";
import { EventPattern, Payload, ClientProxy} from "@nestjs/microservices";
import { CreatePaymentDto } from "./dtos";
import { PaymentsService } from "./payments.service";

@Controller()
export class PaymentsMicroserviceController {

    constructor(
        @Inject('NATS_SERVICE') private natsClient: ClientProxy,
        private paymentService: PaymentsService
) {}

    @EventPattern('createPayment')
    async createPayment(@Payload() createPaymentDto:CreatePaymentDto){
        console.log(createPaymentDto);
        const newPayment =  await this.paymentService.createPayment(createPaymentDto)
        if(newPayment) this.natsClient.emit('paymentCreated', newPayment);
        
        

    }
}