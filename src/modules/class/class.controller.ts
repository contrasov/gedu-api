import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ClassService } from './class.service';
import { ClassDto } from './dto/class.dto';
import { addStudenDto } from './dto/student.dto';

@ApiTags('class')
@Controller('class')
export class ClassController {
    constructor(private classService: ClassService){}

    @Post()
    async create(@Body() createClassDto: ClassDto){
        return this.classService.createClass(createClassDto);
    }

    @Get()
    async getAll(){
        return this.classService.getClasses();
    }

    @Put(':id')
    @ApiBody({type: ClassDto, required: false})
    async putClass(@Param('id') classId: string, @Body() updateClassDto: Partial<ClassDto>){
        return this.classService.putClass(classId, updateClassDto);
    }

    @Delete(':id')
    async deleteClass(@Param('id') classId: string){
        return this.classService.deleteClass(classId);
    }

    @Post(':id/add-student')
    async addStudent(@Param('id') classId: string, @Body() addStudenDto: addStudenDto) {
        return this.classService.addStudent(classId, addStudenDto);
    }

}