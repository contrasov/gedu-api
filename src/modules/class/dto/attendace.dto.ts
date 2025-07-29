import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsArray } from 'class-validator';
import { ObjectId } from "mongoose";

class RecordDto {
    @ApiProperty({ example: "60d0fe4f5311236168a109ca" })
    @IsNotEmpty()
    studentId: ObjectId;

    @ApiProperty({ enum: ['Presente', 'Faltou'] })
    @IsNotEmpty()
    @IsEnum(['Presente', 'Faltou'])
    status: 'Presente' | 'Faltou';
}

export class AttendanceDto {
    @ApiProperty()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ type: [RecordDto] })
    @IsNotEmpty()
    @IsArray()
    records: RecordDto[];
}