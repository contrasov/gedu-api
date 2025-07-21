import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";

@Schema({collection: 'subjects'})
export class Subject extends Document {
    @Prop({required: true})
    code: string;
    
    @Prop({required: true})
    name: string;
    
    @Prop({required: false})
    description: string;
    
    @Prop({type: mongoose.Schema.Types.ObjectId, required: true})
    courseId: ObjectId;
    
    @Prop({required: true})
    status: boolean;
    
    @Prop({type: Date, default: Date.now})
    dateCreate: Date;

    @Prop({type: [mongoose.Schema.Types.ObjectId], required: false})
    classIds: ObjectId[];
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
