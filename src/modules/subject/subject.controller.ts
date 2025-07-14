import { Controller, Post, Get, Param, Put, Delete, Body } from "@nestjs/common";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { SubjectService } from "./subject.service";
import { SubjectDto } from "./dto/subject.dto";

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
    constructor(private subjectService: SubjectService){}

    @Post()
    async create(@Body() createSubjectDto: SubjectDto){
        return this.subjectService.createSubject(createSubjectDto);
    }

    @Get()
    async getAll(){
        return this.subjectService.getSubjects();
    }

    @Get(':id')
    async getSubject(@Param('id') subjectId: string){
        return this.subjectService.getSubject(subjectId);
    }

    @Put(':id')
    @ApiBody({type: SubjectDto, required: false})
    async putSubject(@Param('id') subjectId: string, @Body() updateSubject: Partial<SubjectDto>){
        return this.subjectService.putSubject(subjectId, updateSubject);
    }

    @Delete(':id')
    async deleteSubject(@Param('id') subjectId: string){
        return this.subjectService.deleteSubject(subjectId);
    }
}