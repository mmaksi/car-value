import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });

    return await this.usersRepository.save(user);
  }

  async findOne(id: number) {
    if (!id) return null;
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async find(email: string) {
    return await this.usersRepository.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (user) {
      Object.assign(user, attrs);
      return this.usersRepository.save(user);
    }
    return null;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user) return this.usersRepository.remove(user);
    return null;
  }
}
