import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { SignUpDto } from './dto/signUp.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/loginDto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { name, password, email } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userModel.create({
        name,
        password: hashedPassword,
        email,
      });
      return user;
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Email already exists');
      }
    }
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;
    console.log(email, password);
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}
