import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Subject } from "./subject.schema";
import { SubjectDto } from "./dto/subject.dto";
import { Course } from '../course/course.schema';

@Injectable()
export class SubjectService {
    constructor(
        @InjectModel(Subject.name) private subjectModel: Model<Subject>,
        @InjectModel(Course.name) private courseModel: Model<Course>
    ) {}

    async createSubject(createSubjectDto: SubjectDto) {
        const newSubject = new this.subjectModel(createSubjectDto);
        const nameInitials = createSubjectDto.name.substring(0, 3).toUpperCase();
        const randomNumbers = Math.floor(1000 + Math.random() * 5000);
        const code = `${nameInitials}${randomNumbers}`;
        newSubject.code = code;

        const savedSubject = await newSubject.save();

        if (createSubjectDto.courseId) {
            await this.courseModel.findByIdAndUpdate(
                createSubjectDto.courseId,
                { $addToSet: { subjectIds: savedSubject._id } }
            );
        }

        return savedSubject;
    }

    async getSubjects(){
        return await this.subjectModel.find();
    }

    async getSubject(subjectId: string){
        return await this.subjectModel.findById(subjectId).populate({
            path: 'courseId',
            model: 'Course',
            select: 'code name'
        });
    }

    async putSubject(subjectId: string, updateSubjectDto: Partial<SubjectDto> ){
        return await this.subjectModel.findByIdAndUpdate(subjectId, updateSubjectDto);
    }

    async deleteSubject(subjectId: string){
        const subjectToDelete = await this.subjectModel.findByIdAndDelete(subjectId)
        if(subjectToDelete){
            await this.courseModel.updateMany(
                { subjectIds: subjectId },
                { $pull: { subjectIds: subjectId } }
            );
        }

    }
}