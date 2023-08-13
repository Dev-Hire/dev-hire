import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User, UserDocument } from './schemas/users.schemas';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<void> {
    await this.userModel.findByIdAndRemove(id).exec();
  }

}
