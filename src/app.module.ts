import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { SubjectModule } from './modules/subject/subject.module';
import { ClassModule } from './modules/class/class.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://mongo:27017/test'),
    AuthModule, UserModule, CourseModule, SubjectModule, ClassModule,
  ],
})
export class AppModule {}
