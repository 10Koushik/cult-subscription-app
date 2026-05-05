import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createUser(data: any) {
    return this.userModel.create(data);
  }

  async getUsers() {
    return this.userModel.find();
  }
}