import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, 
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const newUser = new this.userModel({
      ...registerUserDto,
      password: hashedPassword
    });

    if(registerUserDto.code){
      const code = await this.userService.verifyCode({code: registerUserDto.code});
      newUser.courseId = code.courseId;
    }
    return await newUser.save();
  }

  async login(email: string, password: string): Promise<{acces_token: string}>{
    const user = await this.userModel.findOne({email});
    if(!user) {
      throw new UnauthorizedException('Usuário ou senha inválido');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
      throw new UnauthorizedException('Usuário ou senha inválido');
    }

    const paiload = {sub: user.id, email: user.email, name: user.name, type: user.type};
    const acces_token = this.jwtService.sign(paiload);

    return { acces_token };
  }
}
