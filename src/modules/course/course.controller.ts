import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';

@ApiTags('course')
@Controller('course')
export class CourseController {
    constructor(private courseService: CourseService){}

    @Post()
    async create(@Body() createCourseDto: CourseDto){
        return this.courseService.createCourse(createCourseDto);
    }

    @Get()
    async getAll(){
        return this.courseService.getCourses();
    }

    @Get(':id')
    async getCourse(@Param('id') courseId: string){
        return this.courseService.getCourse(courseId)
    }

    @Put(':id')
    @ApiBody({type: CourseDto, required: false})
    async putCourse(@Param('id') courseId: string, @Body() updateCourseDto: Partial<CourseDto>){
        return this.courseService.putCourse(courseId, updateCourseDto);
    }

    @Delete(':id')
    async deleteCourse(@Param('id') courseId: string){
        return this.courseService.deleteCourse(courseId);
    }
}
