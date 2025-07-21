import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './course.schema';
import { Model } from 'mongoose';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name) private courseModel: Model<Course>){}

    async createCourse(createCourseDto: CourseDto){
        const newCourse = new this.courseModel(createCourseDto);
        const nameInitials = createCourseDto.name.substring(0, 3).toUpperCase();
        const randomNumbers = Math.floor(1000 + Math.random() * 5000)
        const code = `${nameInitials}${randomNumbers}`;
        newCourse.code = code;
        return await newCourse.save();
    }

    async getCourses(){
        return await this.courseModel.find().populate({
            path: 'subjectIds',
            model: 'Subject',
            select: 'name'
        });
    }

    async getCourse(courseId: string){
        return await this.courseModel.findById(courseId).populate({
            path: 'subjectIds',
            model: 'Subject',
            select: 'code name classIds',
            populate: {
                path: 'classIds',
                model: 'Class',
                select: 'name'
            }
        });
    }

    async putCourse(courseId: string, updateCourseDto: Partial<CourseDto>){
        return await this.courseModel.findByIdAndUpdate(courseId, updateCourseDto);
    }

    async deleteCourse(courseId: string){
        return await this.courseModel.findByIdAndDelete(courseId);
    }
}
