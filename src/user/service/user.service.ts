import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '../request/user.request';
import { UserResponse } from '../responses/user.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private useReonsitory: Repository<User>,
  ) {}

  async findAll(): Promise<UserResponse[]> {
    const users = await this.useReonsitory.find();
    const usersRes = await Promise.all(
      users.map((user) => {
        let userRes = new UserResponse();
        userRes.firstName = user.firstName;
        return userRes;
      }),
    );
    return usersRes;
  }

  findOne(id: number): Promise<User | null> {
    return this.useReonsitory.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.useReonsitory.delete({ id });
  }

  async create(userDTO: UserDTO): Promise<UserResponse> {
    let user = new User();
    user.firstName = userDTO.firstName;
    user.email = userDTO.email;
    const newUser = await this.useReonsitory.save(user);
    let userRes = new UserResponse();
    userRes.firstName = newUser.firstName;
    return userRes;
  }

  update(id: number, user: User): Promise<any | null> {
    return this.useReonsitory.update({ id }, user);
  }
}
