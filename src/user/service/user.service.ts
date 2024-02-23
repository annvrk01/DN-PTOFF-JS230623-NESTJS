import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from '../request/user.request';
import { UserResponse } from '../responses/user.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<UserResponse[]> {
    //     return await this.userRepository.findAndCount({
    //       where: {
    //           username: ILike(`%${keyword || ''}%`)
    //       },
    //       order: { id: 'DESC' }, // ORDER BY
    //       take: 5, // Tương đương LIMIT
    //       skip: 0, // Tương đương OFFSET
    //   });
    // }
    const users = await this.userRepository.find();
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
    const user = this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async create(userDTO: UserDTO): Promise<UserResponse> {
    let user = new User();
    user.firstName = userDTO.firstName;
    user.email = userDTO.email;
    const newUser = await this.userRepository.save(user);
    let userRes = new UserResponse();
    userRes.firstName = newUser.firstName;
    return userRes;
  }

  update(id: number, user: User): Promise<any | null> {
    return this.userRepository.update({ id }, user);
  }

}
