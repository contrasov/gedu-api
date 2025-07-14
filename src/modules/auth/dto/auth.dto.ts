import { ApiProperty } from "@nestjs/swagger";
import { UserType } from "src/modules/user/user.schema";
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';


export class RegisterUserDto {
    @ApiProperty({enum: UserType})
    @IsNotEmpty()
    type: UserType;

    @ApiProperty({required: false})
    @IsOptional()
    code: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    dateBirth: string;
    
    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    cpf: string;

    @ApiProperty({required: false})
    @IsOptional()
    training: string;    

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}

export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty()
    email: string;
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}