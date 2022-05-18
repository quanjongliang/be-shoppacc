/// <reference types="multer" />
import { User } from '@/entity';
import { CreateAccountDto } from '../dto';
import { AccountService } from '../service';
export declare class AccountController {
    private accountService;
    constructor(accountService: AccountService);
    createNewAccount(createAccountDto: CreateAccountDto, user: User, files: Array<Express.Multer.File>): Promise<import("@/entity").Account>;
    buyAccount(user: User, id: string): Promise<[User, import("@/entity").Account, any, import("@/entity").History]>;
    deleteAccount(id: string): Promise<[...(import("typeorm").DeleteResult | [any, import("typeorm").DeleteResult])[], import("typeorm").DeleteResult | [any, import("typeorm").DeleteResult]]>;
}
