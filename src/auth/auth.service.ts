import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { SignUpDto } from './dto/signUp.dto';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { name, password, email } = signUpDto;
    return await this.userModel.create({ name, password, email });
  }
}
