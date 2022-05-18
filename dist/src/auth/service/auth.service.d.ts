import { BaseQueryResponse } from '@/core/';
import { History, User, UserWithOutPassword } from '@/entity';
import { HistoryService } from '@/history';
import { MailerService } from '@/mailer';
import { UserRepository } from '@/repository';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto, CreateUserDto, ForgetPasswordDto, QueryUserDto, UpdateUserRoleDto } from '../dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private mailerService;
    private historyService;
    constructor(userRepository: UserRepository, jwtService: JwtService, mailerService: MailerService, historyService: HistoryService);
    validateUser(username: string, password: string): Promise<User | null>;
    login(user: UserWithOutPassword): Promise<string>;
    createNewUser(createUserDto: CreateUserDto): Promise<void>;
    submitCreateNewUser(token: string): Promise<string>;
    changeUserPassword(changePasswordDto: ChangePasswordDto, username: string): Promise<string>;
    forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<any>;
    verifyResetPassword(tokenResetPassword: string): Promise<string>;
    createAdminUser(createUserDto: CreateUserDto): Promise<User>;
    updateUserRole(user: User, updateUserRoleDto: UpdateUserRoleDto): Promise<[User, History]>;
    getAllUser(): Promise<User[]>;
    getAllUserList(queryUserDto: QueryUserDto): Promise<BaseQueryResponse<User>>;
}
