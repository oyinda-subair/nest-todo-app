import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User> {
    return this.repository.findOne({ where: { id: id } });
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.email = body.email;

    return this.repository.save(user);
  }

  public findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    await this.repository.update(id, user);

    return this.repository.findOne({ where: { id: id } });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
