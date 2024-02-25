import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../request/user.request';
import { UserResponse } from '../responses/user.response';
import { UserSearchRequest } from '../request/user.search.request';
import { Paginate } from 'src/common/paginate';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(userSearchRequest: UserSearchRequest): Promise<Paginate>;
    findOne(id: number): Promise<UserResponse | null>;
    remove(id: number): Promise<void>;
    create(userDTO: UserDTO): Promise<UserResponse>;
    update(id: number, userDTO: UserDTO): Promise<any | null>;
}
