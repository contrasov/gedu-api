import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";

@Schema({collection: 'classes'})
export class Class extends Document {
    @Prop({required: true})
    name: String;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true})
    courseId: ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    subjectId: ObjectId;

    @Prop({required: true})
    schedule: string[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
    teacherId: ObjectId;

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true})
    studentIds: ObjectId[];
    
    @Prop({type: Date, default: Date.now})
    dateCreate: Date;
}

export const ClassSchema = SchemaFactory.createForClass(Class);