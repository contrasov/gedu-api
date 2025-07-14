import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './class.schema';
import { ClassDto } from './dto/class.dto';
import { Subject } from '../subject/subject.schema';
import { User, UserType } from '../user/user.schema';
import { addStudenDto } from './dto/student.dto';

@Injectable()
export class ClassService {
    constructor(
        @InjectModel(Class.name) private classModel: Model<Class>,
        @InjectModel(Subject.name) private subjectModel: Model<Subject>,
        @InjectModel(User.name) private userModel: Model<User>
    ){}

    async createClass(createClassDto: ClassDto){
        const subject = await this.subjectModel.findById(createClassDto.subjectId);
        if (!subject) {
            throw new Error('Disciplina não encontrada.')
        }

        const verify = await this.classModel.countDocuments({ subjectId: createClassDto.subjectId});
        const turmaSuffix = String.fromCharCode(65 + verify);

        const newClass = new this.classModel({
            ...createClassDto,
            name: `${subject.name} - Turma ${turmaSuffix}`
        });
        return await newClass.save();
    }

    async getClasses() {
        return await this.classModel.find();
    }

    async getClass(classId: string) {
        return await this.classModel.findById(classId);
    }

    async putClass(classId: string, updateClassDto: Partial<ClassDto>){
        return await this.classModel.findByIdAndUpdate(classId, updateClassDto);
    }

    async deleteClass(classId: string){
        return await this.classModel.findByIdAndDelete(classId);
    }

    async addStudent(classId: string, addStudenDto: addStudenDto){
        const student = await this.userModel.findById(addStudenDto.student);
        if (!student || student.type !== UserType.STUDENT ){
            throw new Error(
                !student
                    ? 'Usuário não encontrado.'
                    : 'Não é um aluno da Gedu.'
            );
        }

        const updateClass = await this.classModel.findByIdAndUpdate(
            classId,
            {$addToSet: { studentIds: addStudenDto.student} },
            { new: true }
        );

        if (!updateClass) {
            throw new Error('Não foi possivel encontrar a turma.')
        }

        return updateClass;
    }
}