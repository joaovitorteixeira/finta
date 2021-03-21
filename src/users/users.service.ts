import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseException } from 'src/exception/database.exception';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user).catch(() => {
      throw new DatabaseException();
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({ where: { active: true } });
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail(id).catch(() => {
      throw new DatabaseException();
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneOrFail(id).catch(() => {
      throw new DatabaseException();
    });

    user.active = false;

    return this.userRepository.save(user);
  }
}
