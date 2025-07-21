import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

export enum UserType {
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  ADM = 'Adm'
}

@Schema({ collection: 'users' })
export class User extends Document {
  @Prop({required: true, enum: UserType})
  type: UserType
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  dateBirth: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({required: true, unique: true})
  cpf: string;
  @Prop({required: function() {return this.type == UserType.TEACHER;} })
  training: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: function() {return this.type == UserType.STUDENT; }})
  courseId: ObjectId;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], required: function() {return this.type == UserType.TEACHER;} })
  subjects: ObjectId[];
  @Prop({ required: true })
  password: string;
}

@Schema({collection: 'emailCodes'})
export class EmailCode extends Document {
  @Prop({required: true, enum: UserType})
  type: UserType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: function() {return this.type == UserType.STUDENT;} })
  courseId: ObjectId;

  @Prop({ required: true })
  code: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const EmailCodeSchema = SchemaFactory.createForClass(EmailCode);