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

  /**
   * find all users
   * @returns
   */
  findAll() {
    return this.userModel.find({});
  }

  /**
   * find single user by id
   * @param _id string
   * @returns
   */
  findOne(_id: string) {
    return this.userModel.findOne({ _id });
  }

  /**
   *
   * @param _id objectId
   * @param payload UpdateUserDto
   * @returns
   */
  update(_id: string, payload: UpdateUserDto) {
    return this.userModel.updateOne({ _id }, payload);
  }

  /**
   * remove a user
   * @param _id string
   * @returns
   */
  remove(_id: string) {
    return this.userModel.findByIdAndDelete({ _id });
  }
}
