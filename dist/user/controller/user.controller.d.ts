import { UserDTO } from "../request/user.request";
import { UserService } from '../service/user.service';
import { User } from '../entities/user.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(userDTO: UserDTO): string;
    findAll(): Promise<User[]>;
    findOne(id: number): string;
    update(id: string, body: any): string;
    remove(id: string): string;
}
