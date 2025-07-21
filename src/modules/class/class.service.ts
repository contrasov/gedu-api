import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './class.schema';
import { ClassDto } from './dto/class.dto';
import { Subject } from '../subject/subject.schema';
import { User, UserType } from '../user/user.schema';
import { addStudenDto } from './dto/student.dto';
import { Course } from '../course/course.schema';

@Injectable()
export class ClassService {
    constructor(
        @InjectModel(Class.name) private classModel: Model<Class>,
        @InjectModel(Subject.name) private subjectModel: Model<Subject>,
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Course.name) private courseModel: Model<Course>
    ) { }

    async createClass(createClassDto: ClassDto) {
        const subject = await this.subjectModel.findById(createClassDto.subjectId);
        if (!subject) {
            throw new Error('Disciplina não encontrada.');
        }

        const verify = await this.classModel.countDocuments({ subjectId: createClassDto.subjectId });
        const turmaSuffix = String.fromCharCode(65 + verify);

        const newClass = new this.classModel({
            ...createClassDto,
            name: `${subject.name} - Turma ${turmaSuffix}`
        });

        const savedClass = await newClass.save();

        await this.subjectModel.findByIdAndUpdate(
            createClassDto.subjectId,
            { $addToSet: { classIds: savedClass._id } }
        );

        return savedClass;
    }

    async getClasses(studentId: string) {
        return await this.classModel.find({ studentIds: studentId }).populate([
            {
                path: 'subjectId',
                model: 'Subject',
                select: 'code'
            },
            {
                path: 'teacherId',
                model: 'User',
                select: 'name'
            }
        ]);
    }

    async getClass(classId: string) {
        return await this.classModel.findById(classId).populate([
            {
                path: 'subjectId',
                model: 'Subject',
                select: 'code'
            },
            {
                path: 'teacherId',
                model: 'User',
                select: 'name'
            },
            {
                path: 'studentIds',
                model: 'User',
                select: 'name email'
            }
        ]);
    }

    async putClass(classId: string, updateClassDto: Partial<ClassDto>) {
        return await this.classModel.findByIdAndUpdate(classId, updateClassDto);
    }

    async deleteClass(classId: string) {
        const classToDelete = await this.classModel.findByIdAndDelete(classId);
        if (classToDelete) {
            await this.subjectModel.updateMany(
                { classesId: classId },
                { $pull: { classesId: classId } }
            );
        }
        return classToDelete;
    }

    async addStudent(classId: string, studentId: string) {
        const student = await this.userModel.findById(studentId);
        if (!student || student.type !== UserType.STUDENT) {
            throw new Error(
                !student
                    ? 'Usuário não encontrado.'
                    : 'Não é um aluno da Gedu.'
            );
        }

        const updateClass = await this.classModel.findByIdAndUpdate(
            classId,
            { $addToSet: { studentIds: studentId } }, 
            { new: true }
        );

        if (!updateClass) {
            throw new Error('Não foi possível encontrar a turma.');
        }

        return updateClass;
    }

    async updateClassStudentIds(classId: string, studentId: string) {
        return await this.classModel.findByIdAndUpdate(
            classId,
            { $addToSet: { studentIds: studentId } },
            { new: true }
        );
    }

    async removeStudent(classId: string, studentId: string) {
        const student = await this.userModel.findById(studentId);
        
        if (!student || student.type !== UserType.STUDENT) {
            throw new Error(
                !student
                    ? 'Usuário não encontrado.'
                    : 'Não é um aluno da Gedu.'
            );
        }
    
        const updatedClass = await this.classModel.findByIdAndUpdate(
            classId,
            { $pull: { studentIds: studentId } },
            { new: true }
        );
    
        if (!updatedClass) {
            throw new Error('Não foi possível encontrar a turma.');
        }
    
        return updatedClass;
    }
}