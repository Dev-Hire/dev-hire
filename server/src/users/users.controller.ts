import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User } from './schemas/users.schemas';


@Controller('/api/v1/users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

     @Post()
     async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
       return this.usersService.createUser(createUserDto);
     }

     @Get()
     async findAllUsers(): Promise<User[]> {
       return this.usersService.findAllUsers();
     }

     @Get(':id')
     async findUserById(@Param('id') id: string): Promise<User> {
       return this.usersService.findUserById(id);
     }

     @Put(':id')
     async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
       return this.usersService.updateUser(id, updateUserDto);
     }

     @Delete(':id')
     async deleteUser(@Param('id') id: string): Promise<void> {
       return this.usersService.deleteUser(id);
     }

}
