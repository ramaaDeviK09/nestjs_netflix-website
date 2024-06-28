import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Get('/users')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get('/user/:userID')
  async getUserById(@Param('userID') userID: string) {
    return await this.userService.getUserById(userID);
  }

  @Post('/user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put('/user/:userID')
  async updateUser(@Param('userID') userID: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(userID, updateUserDto);
  }

  @Delete('/user/:userID')
  async deleteUser(@Param('userID') userID: string) {
    return await this.userService.deleteUser(userID);
  }
}