import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmailCode, User } from "./user.schema";
import { CreateUserDto } from "./dto/user.dto";
import { CodeDto, VerifyCodeDto } from "./dto/code.dto";
import { Class } from "../class/class.schema";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>, 
        @InjectModel(EmailCode.name) private codeModel: Model<EmailCode>,
        @InjectModel(Class.name) private classModel: Model<Class>
    ) { }

    async getUsers() {
        return await this.userModel.find();
    }

    async getUser(userId: string) {
        return await this.userModel.findById(userId);
    }

    async getStudents() {
        return await this.userModel.find({type: 'Student'});
    }

    async getTeachers() {
        return await this.userModel.find({type: 'Teacher'});
    }

    async putUser(userId: string, updateUserDto: Partial<CreateUserDto>) {
        return await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    }

    async deleteUser(userId: string) {
        const user = await this.userModel.findByIdAndDelete(userId);
        if (user) {
            await this.classModel.updateMany(
                { studentIds: userId },
                { $pull: { studentIds: userId } }
            );
        }
        return user;
    }

    async generateCode(gerenateCodeDto: CodeDto) {
        const code = Math.floor(100000 + Math.random() * 900000);
        const emailCode = new this.codeModel({
            type: gerenateCodeDto.type,
            courseId: gerenateCodeDto.courseId,
            code,
        })
        return await emailCode.save();
    }

    async verifyCode(verifyCodeDto: VerifyCodeDto) {
        const emailCode = await this.codeModel.findOne({ code: verifyCodeDto.code });
        if (!emailCode) {
            throw new UnauthorizedException('Código inválido');
        }

        await this.codeModel.deleteOne({ code: verifyCodeDto.code });

        return emailCode;
    }
}