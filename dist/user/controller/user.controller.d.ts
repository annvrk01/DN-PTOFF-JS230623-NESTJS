import { UserDTO } from '../request/user.request';
import { UserService } from '../service/user.service';
import { UserResponse } from '../responses/user.response';
import { UserSearchRequest } from '../request/user.search.request';
import { Paginate } from 'src/common/paginate';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(userSearchRequest: UserSearchRequest): Promise<Paginate>;
    findOne(id: number): Promise<UserResponse>;
    create(userDTO: UserDTO): Promise<UserResponse>;
    update(id: number, userDTO: UserDTO): string;
    remove(id: number): Promise<void>;
}
