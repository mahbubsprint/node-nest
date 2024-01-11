import {
    BadRequestException,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LogInUserDto } from 'src/user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService, private jwt: JwtService){}

    async signup(createuserDto:CreateUserDto){

        const { name, email, password } = createuserDto;

    const userExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prismaService.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return { message: 'User created succefully' };
    }

    async login(logInUserDto:LogInUserDto, req:Request, res:Response){
        const { email, password } = logInUserDto;

        const foundUser = await this.prismaService.user.findUnique({
          where: {
            email,
          },
        });
    
        if (!foundUser) {
          throw new BadRequestException('Wrong credentials');
        }
    
        const compareSuccess = await this.comparePasswords({
          password,
          hash: foundUser.hashedPassword,
        });
        if (!compareSuccess) {
            throw new BadRequestException('Wrong credentials');
          }
      
          const payload = { sub: foundUser.id, username: foundUser.email };
          const token = await this.signToken(payload);
      
          if (!token) {
            throw new ForbiddenException('Could not signin');
          }
        //   res.clearCookie("token_");
          res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
        }).send({ message: 'Logged in succefully' });
           console.log(req.cookies);
        // res.end()
      
        //   return res.send({ message: 'Logged in succefully' });
    }

    async hashPassword(password: string) {
        const saltOrRounds = 10;
    
        return await bcrypt.hash(password, saltOrRounds);
    }

    async comparePasswords(args: { hash: string; password: string }) {
        return await bcrypt.compare(args.password, args.hash);
      }
    
    async signToken(payload) {
        // const payload = {
        //     id: userId,
        //     email: email,
        // };

        const token = await this.jwt.signAsync(payload, {
            secret: jwtSecret,
        });

        return {"token":token};
    }
}
