import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";

@Schema({collection: 'news'})
export class News extends Document {
    @Prop({required: true})
    title: String;

    @Prop({required: true})
    description: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true})
    classId: ObjectId;
    
    @Prop({type: Date, default: Date.now})
    dateCreate: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News);