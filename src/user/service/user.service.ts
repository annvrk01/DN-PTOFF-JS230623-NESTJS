import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { UserDTO } from '../request/user.request';
import { UserResponse } from '../responses/user.response';
import { UserSearchRequest } from '../request/user.search.request';
import { Paginate } from 'src/common/paginate';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  /**
   *
   * @returns
   */
  async findAll(userSearchRequest: UserSearchRequest): Promise<Paginate> {
    const findManyOptions: FindManyOptions = {
      where: {
        firstName: ILike(`%${userSearchRequest.keyword || ''}%`)
      },
      order: { id: 'DESC' }, // ORDER BY
      take: userSearchRequest.limit, // Tương đương LIMIT
      skip: (userSearchRequest.page - 1) * userSearchRequest.limit, // Tương đương OFFSET
      withDeleted: true,
    }
    const [result, total] = await this.userRepository.findAndCount(findManyOptions);
    const usersRes = await Promise.all(
      result.map((user) => {
        const userRes = new UserResponse();
        userRes.firstName = user.firstName;
        return userRes;
      }),
    );
    return {
      data: usersRes,
      count: total
    };
  }

  /**
   *
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<UserResponse | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    const userResponse = new UserResponse();
    userResponse.email =user.email;
    userResponse.firstName = user.firstName
    return userResponse;
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
   // await this.userRepository.delete({ id });
   await this.userRepository.softRemove(user);
  }

  /**
   *
   * @param userDTO
   * @returns
   */
  async create(userDTO: UserDTO): Promise<UserResponse> {
    // Khởi tạo đối tượng User 
    let user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName
    user.email = userDTO.email;

    const newUser = await this.userRepository.save(user).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });

    // convent data response
    let userRes = new UserResponse();
    userRes.firstName = newUser.firstName;
    return userRes;
  }

  /**
   *
   * @param id
   * @param user
   * @returns
   */
  async update(id: number, userDTO: UserDTO): Promise<any | null> {
    let user = new User();
    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName
    user.email = userDTO.email;
    await this.userRepository.update({ id }, user).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    });
  }
}
