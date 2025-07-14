import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { IsNotEmpty } from 'class-validator';


export class addStudenDto {
    @ApiProperty()
    @IsNotEmpty()
    student: ObjectId;
}