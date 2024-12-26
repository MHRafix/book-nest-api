import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegistrationDto } from './dto/registration.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  /**
   * create, update or get user
   * @param email string
   * @param payload RegistrationDto
   * @returns
   */
  async createOrGetUser(email: string, payload?: RegistrationDto) {
    const user = await this.userModel.findOne({ email });

    if (user) {
      if (payload) {
        return this.userModel.updateOne({ email }, payload);
      }
      return user;
    }

    return this.userModel.create({
      email,
      ...payload,
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, payload: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
