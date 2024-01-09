import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';

import { Role, User } from '@app/common/models';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  private async validateCreateUser(createUser: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUser.email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }

  async create(createUser: CreateUserDto) {
    await this.validateCreateUser(createUser);
    const newUser = new User({
      ...createUser,
      password: await bcrypt.hash(createUser.password, 10),
      roles: createUser.roles.map((roleDto) => new Role(roleDto)),
    });
    return this.userRepository.create(newUser);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }

  async getUser(id: number) {
    return this.userRepository.findOne(
      {
        id,
      },
      { roles: true },
    );
  }
}
