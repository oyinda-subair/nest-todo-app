import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly service: UserService,
  ) {}

  @Get('/:id')
  public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.getUser(id);
  }

  @Post()
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }

  @Get()
  public getAllUsers(): Promise<User[]> {
    return this.service.findAll();
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.service.update(id, user);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    const user = await this.service.getUser(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    return this.service.delete(id);
  }
}
