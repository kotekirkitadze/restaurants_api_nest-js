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
import { JwtService } from '@nestjs/jwt';
import ApiFeatures from 'src/utils/apiFeatures.utils';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, password, email } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userModel.create({
        name,
        password: hashedPassword,
        email,
      });
      const token = await ApiFeatures.assignJWTtoken(user._id, this.jwtService);

      return { token };
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Email already exists');
      }
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = await ApiFeatures.assignJWTtoken(user._id, this.jwtService);

    return { token };
  }
}
