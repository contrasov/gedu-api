import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { Class, ClassSchema } from './class.schema';
import { Subject, SubjectSchema } from '../subject/subject.schema';
import { User, UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService]
})
export class ClassModule {}
