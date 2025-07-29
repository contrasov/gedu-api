import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";

@Schema({ collection: 'activities' })
export class Activities extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true })
    classId: ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, type: Date })
    endDate: Date;

    @Prop({required: true, enum: ['Prova', 'Tarefa']})
    type: string;

    @Prop({ type: Date, default: Date.now })
    dateCreate: Date;
}

export const ActivitiesSchema = SchemaFactory.createForClass(Activities);