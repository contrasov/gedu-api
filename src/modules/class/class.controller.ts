import { Controller, Post, Get, Param, Put, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ClassService } from './class.service';
import { ClassDto } from './dto/class.dto';
import { addStudenDto } from './dto/student.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserType } from "src/modules/user/user.schema";
import { NewsDto } from './dto/news.dto';
import { AttendanceDto } from './dto/attendace.dto';
import { ActivitieDto } from './dto/activitie.dto';

@ApiTags('class')
@Controller('class')
@UseGuards(JwtAuthGuard)
export class ClassController {
    constructor(private classService: ClassService){}

    @Post()
    async create(@Body() createClassDto: ClassDto){
        return this.classService.createClass(createClassDto);
    }

    @Post(':id/add-student')
    async addStudent(@Param('id') classId: string, @Request() req) {
        const studentId = req.user.id;
        const student = await this.classService.addStudent(classId, studentId); 
        await this.classService.updateClassStudentIds(classId, studentId);
        return student;
    }

    @Post(':id/add-news')
    async addNews(@Param('id') classId: string, @Body() createNews: NewsDto) {
        return this.classService.createNews(classId, createNews);
    }

    @Post(':id/add-attendance')
    async addAttendace(@Param('id') classId: string, @Body() createAttendance: AttendanceDto){
        return this.classService.createAttendance(classId, createAttendance);
    }

    @Post(':id/add-activity')
    async addActivity(@Param('id') classId: string, @Body() createActivity: ActivitieDto){
        return this.classService.createActivitie(classId, createActivity);
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

        @Get('activities')
    async getMyActivities(@Request() req){
        const studentId = req.user.id;
        return this.classService.getActivitiesInMyClass(studentId);
    }

    @Get(':id')
    async getClass(@Param('id') classId: string){
        return this.classService.getClass(classId);
    }

    @Get(':id/news')
    async getNewsByClass(@Param('id') classId: string){
        return this.classService.getNewsByClass(classId);
    }

    @Get(':id/activities')
    async getActivitiesByClass(@Param('id') classId: string){
        return this.classService.getActivitiesByClass(classId);
    }

    @Get(':id/attendance')
    async getAttedanceByClass(@Param('id') classId: string){
        return this.classService.getAttendanceByClass(classId);
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

    @Delete(':id/remove-student')
    async removeStudent(@Param('id') classId: string, @Request() req){
        const studentId = req.user.id;
        return await this.classService.removeStudent(classId, studentId);
    }

    @Delete(':id/news/:newsId')
    async deleteNews(@Param('id') classId: string, @Param('newsId') newsId: string){
        return await this.classService.deleteNews(classId, newsId);
    }

}