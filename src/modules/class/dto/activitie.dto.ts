import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum, IsArray } from 'class-validator';

export class ActivitieDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    @ApiProperty({enum: ['Prova', 'Tarefa']})
    @IsEnum(['Prova', 'Tarefa'])
    type: 'Prova' | 'Tarefa';
}