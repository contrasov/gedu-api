import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

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