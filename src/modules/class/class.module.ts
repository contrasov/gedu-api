import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { Class, ClassSchema } from './class.schema';
import { Subject, SubjectSchema } from '../subject/subject.schema';
import { User, UserSchema } from '../user/user.schema';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Subject.name, schema: SubjectSchema },
      { name: User.name, schema: UserSchema }
    ]),
    CourseModule
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService, MongooseModule]
})
export class ClassModule {}
