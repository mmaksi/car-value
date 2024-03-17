import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Password } from 'src/utils/Password';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // Hash the user's password
    const hashedPassword = await Password.hash(password);

    if (hashedPassword instanceof Error) {
      throw new BadRequestException('Password hashing failed');
    } else {
      // Create a new user and save it
      const user = await this.usersService.createUser(email, hashedPassword);
      return user;
    }
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      const hashedPassword = await Password.hash(password);
      if (typeof hashedPassword === 'string') {
        const match = await Password.decrypt(password, hashedPassword);
        if (!match) {
          throw new UnauthorizedException('Invalid credentials');
        }
        return user;
      }
    }
  }
}
