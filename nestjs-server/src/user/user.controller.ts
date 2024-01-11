import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post("/create-user")
    createNewUser(@Body() createUserDto: CreateUserDto){
        try{
            return this.userService.createUser(createUserDto);
        }catch(error){
            throw error;
        }
    }
}
