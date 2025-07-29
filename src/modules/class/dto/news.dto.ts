import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from "mongoose";

export class NewsDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;
}