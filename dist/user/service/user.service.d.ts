import { User } from '../entities/user.entity';
export declare class UserService {
    private readonly users;
    create(user: User): void;
    findAll(): User[];
}
