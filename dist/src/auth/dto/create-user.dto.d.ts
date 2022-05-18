import { USER_ROLE } from '@/entity';
export declare class CreateUserDto {
    username: string;
    password: string;
    email: string;
}
export declare class UpdateUserRoleDto {
    username: string;
    role: USER_ROLE;
}
export declare class LoginUserDto {
    username: string;
    password: string;
}
