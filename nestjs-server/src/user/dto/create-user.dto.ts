import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({description: 'Please Enter Name'})
    @IsString()
    name?:string

    @ApiProperty({description: 'Please Enter Email'})
    @IsEmail()
    email: string
    
    @ApiProperty({description: 'Please Enter Password'})
    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: 'Passowrd has to be at between 3 and 20 chars' })
    password: string;
}
