import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { UserService} from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { CodeDto, VerifyCodeDto } from './dto/code.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get()
    async getAll() {
        return this.userService.getUsers();
    }

    @Get('students')
    async getStudents() {
        return this.userService.getStudents();
    }

    @Get('teachers')
    async getTeachers() {
        return this.userService.getTeachers();
    }

    @Get(':id')
    async getUser(@Param('id') userId: string) {
        return this.userService.getUser(userId);
    }

    @Put(':id')
    @ApiBody({type: CreateUserDto, required: false})
    async putUser(@Param('id') userId: string, @Body() updateUserDto: Partial<CreateUserDto>){
        return this.userService.putUser(userId, updateUserDto);
    }

    @Delete(':id')
    async deleteUserById(@Param('id') userId: string){
        return this.userService.deleteUser(userId);
    }

    @Post('generate-code')
    async generateCode(@Body() gerenateCodeDto: CodeDto){
        return this.userService.generateCode(gerenateCodeDto);
    }

    @Post('verify-code')
    async verifyCode(@Body() verifyCodeDto: VerifyCodeDto){
        return this.userService.verifyCode(verifyCodeDto);
    }

}