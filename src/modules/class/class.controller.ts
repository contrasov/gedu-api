import { Controller, Post, Get, Param, Put, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ClassService } from './class.service';
import { ClassDto } from './dto/class.dto';
import { addStudenDto } from './dto/student.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserType } from "src/modules/user/user.schema";

@ApiTags('class')
@Controller('class')
@UseGuards(JwtAuthGuard)
export class ClassController {
    constructor(private classService: ClassService){}

    @Post()
    async create(@Body() createClassDto: ClassDto){
        return this.classService.createClass(createClassDto);
    }

    @Get()
    async getAll(@Request() req) {
        const userId = req.user.id;
        const userType = req.user.type; 

        if (userType === UserType.ADM) {
            return this.classService.getAllClasses(); 
        } else if (userType === UserType.TEACHER) {
            return this.classService.getClassesByTeacher(userId); 
        } else {
            return this.classService.getClasses(userId);
        }
    }

    @Get(':id')
    async getClass(@Param('id') classId: string){
        return this.classService.getClass(classId);
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
    async addStudent(@Param('id') classId: string, @Request() req) {
        const studentId = req.user.id;
        const student = await this.classService.addStudent(classId, studentId); 
        await this.classService.updateClassStudentIds(classId, studentId);
        return student;
    }

    @Delete(':id/remove-student')
    async removeStudent(@Param('id') classId: string, @Request() req){
        const studentId = req.user.id;
        return await this.classService.removeStudent(classId, studentId);
    }

}