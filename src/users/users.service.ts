import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CONSTANTS } from 'src/constants';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
    public readonly users: User[] = [
        {
            userId: 1,
            username: 'john',
            password: 'admin',
            email: 'john@gmail.com',
            age: 22,
            role: CONSTANTS.ROLES.CEO
        },
        {
            userId: 2,
            username: 'maria',
            password: 'admin',
            email: 'maria@gmail.com',
            age: 23,
            role: CONSTANTS.ROLES.MANAGER
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}