import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>){}
    
    createUser(createUserDto: CreateUserDto){
        const newUser =  this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }

    getUserById(userId: string) {
        return this.userRepository.findOne({ 
            where: {
                id: userId,
            },
            relations: ['payments'],
        });
    }

}