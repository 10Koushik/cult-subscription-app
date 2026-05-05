import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  createUser(@Body() body) {
    return this.userService.createUser(body);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
}