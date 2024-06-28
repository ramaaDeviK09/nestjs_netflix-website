import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './models/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

const saltOrRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getAllUsers() {
    return await this.userModel.find();
  }

  async getUserById(userID: string) {
    const checkUserID = await this.userModel.findOne({ _id: userID });
    if (!checkUserID) {
      return { message: 'User not found' };
    }
    return await this.userModel.findById(userID);
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const checkEmailExisted = await this.userModel.findOne({
        email: createUserDto.email,
      });
      if (checkEmailExisted) {
        return { message: 'Email already exists' };
      }
      if (createUserDto.password.length < 6) {
        return { message: 'Password must be at least 6 characters long' };
      }
      const newUser = new this.userModel({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, saltOrRounds),
        avatar:
          'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return await newUser.save();
    } catch (error) {
      return error;
    }
  }

  async updateUser(userID: string, updateUserDto: UpdateUserDto) {
    try {
      const checkUserID = await this.userModel.findOne({ _id: userID });
      if (!checkUserID) {
        return { message: 'User not found' };
      }
      const checkEmailExisted = await this.userModel.findOne({
        email: updateUserDto.email,
      });
      if (checkEmailExisted) {
        return { message: 'Email already exists' };
      }
      return await this.userModel.findByIdAndUpdate(userID, updateUserDto);
    } catch (error) {
      return error;
    }
  }

  async deleteUser(userID: string) {
    try {
      const checkUserID = await this.userModel.findOne({ _id: userID });
      if (!checkUserID) {
        return { message: 'User not found' };
      }
      await this.userModel.findByIdAndDelete(userID);
      return { message: 'User deleted successfully' };
    } catch (error) {
      return error;
    }
  }
}
