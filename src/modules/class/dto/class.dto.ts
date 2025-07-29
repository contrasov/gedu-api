import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { IsNotEmpty } from 'class-validator';

export class ClassDto {
    @ApiProperty()
    @IsNotEmpty()
    courseId: ObjectId;
    
    @ApiProperty()
    @IsNotEmpty()
    subjectId: ObjectId;
    
    @ApiProperty()
    @IsNotEmpty()
    teacherId: ObjectId;
    
    @ApiProperty()
    @IsNotEmpty()
    schedule: string[];    
}