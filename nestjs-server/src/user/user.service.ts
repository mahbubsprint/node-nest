import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService){}

    async createUser(createUserDto: CreateUserDto){
        // return this.prismaService.user.create({
        //     // data: createUserDto
        //     data: "from here"
        // })

        return "from here";
    }
}
