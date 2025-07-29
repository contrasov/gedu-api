import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";

@Schema({ collection: 'attendance' })
export class Attendance extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true })
    classId: ObjectId;

    @Prop({ required: true, type: Date })
    date: Date;

    @Prop({
        required: true, type: [
            {
                studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
                status: { type: String, enum: ['Presente', 'Faltou'], required: true },
            }
        ]
    })
    records: {
        studentId: ObjectId,
        status: 'Presente' | 'Faltou',
    }[];

    @Prop({ type: Date, default: Date.now })
    dateCreate: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);