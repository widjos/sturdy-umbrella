import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from "./dtos";
import { UserService } from "./users.service";

@Controller()

export class UsersMicroserviceController {

    constructor(private userService:UserService){}

    @MessagePattern({ cmd: "createUser"})
    createUser(@Payload() data:CreateUserDto){
        console.log(data);
        return this.userService.createUser(data);

    }

    @MessagePattern({ cmd: 'getUserById'})
    getUserById(@Payload() data){
        const { userId } = data;
        return this.userService.getUserById(userId);

    }

    @EventPattern('paymentCreated')
    paymentCreated(@Payload() data: any){
        console.log(data);
    }
}