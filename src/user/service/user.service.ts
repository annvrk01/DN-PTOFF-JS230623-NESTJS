import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

    private readonly users: User[] = [ {
        id: 1,
        username: '',
        email: '',
        isDeleted: false,
        password: ''
    }];

    create(user: User) {
        this.users.push(user);
    }

    findAll(): User[] {
        return this.users;
    }
}