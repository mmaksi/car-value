import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/User.dto';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    await this.usersService.createUser(email, password);
  }

  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    console.log('controller');
    if (user) return user;
    throw new NotFoundException();
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    if (email === undefined) {
      // Exceptions must be thrown in the controller
      throw new NotFoundException('You must specify an email');
    }
    return await this.usersService.find(email);
  }

  @Delete('/:id')
  async removeUser(@Param('id', ParseIntPipe) id: number) {
    const deletedUser = await this.usersService.remove(id);
    if (deletedUser) return deletedUser;
    throw new NotFoundException();
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(id, body);
    if (updatedUser) return updatedUser;
    throw new NotFoundException();
  }
}
