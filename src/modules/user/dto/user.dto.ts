import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { UserType } from "src/modules/user/user.schema";


export class CreateUserDto {
    @ApiProperty({enum: UserType})
    @IsNotEmpty()
    type: UserType;

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

    @ApiProperty({required: false})
    @IsOptional()
    courseId: ObjectId;
    
    @ApiProperty({required: false})
    @IsOptional()
    subjects: ObjectId[];

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}

export class LoginUserDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}