import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private user = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      const ro = this.user.filter((user) => user.role === role);
      if (!ro.length) {
        throw new NotFoundException('role ila');
      }
      return ro;
    } else {
      return this.user;
    }
  }

  findOne(id: number) {
    return this.user.find((user) => user.id === id);
  }

  createOne(createUserDto: CreateUserDto) {
    const high = [...this.user].sort((a, b) => b.id - a.id);
    const newuser = {
      id: high[0].id + 1,
      ...createUserDto,
    };
    this.user.push(newuser);
    return newuser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.user = this.user.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.user;
  }

  deleteOne(id: number) {
    const rem = this.findOne(id);
    this.user = this.user.filter((user) => user.id != id);
    return rem;
  }
}
