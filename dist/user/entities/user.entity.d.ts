import { Profile } from './profile.enitity';
import { Role } from './role.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    profile: Profile;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
