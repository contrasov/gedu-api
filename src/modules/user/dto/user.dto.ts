import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { UserType } from "src/modules/user/user.schema";


export class CreateUserDto {
    @ApiProperty({enum: UserType})
    type: UserType;

    @ApiProperty()
    name: string;

    @ApiProperty()
    dateBirth: string;
    
    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    cpf: string;

    @ApiProperty({required: false})
    training: string;

    @ApiProperty({required: false})
    courseId: ObjectId;
    
    @ApiProperty({required: false})
    subjects: ObjectId[];

    @ApiProperty()
    password: string;
}

export class LoginUserDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}