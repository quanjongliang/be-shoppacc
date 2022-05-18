/// <reference types="multer" />
import { CloundinaryService } from '@/cloudinary';
import { BaseQueryResponse } from '@/core';
import { Account, User } from '@/entity';
import { HistoryService } from '@/history';
import { MailerService } from '@/mailer';
import { AccountRepository, TagRepository, UserRepository } from '@/repository';
import { Connection } from 'typeorm';
import { CreateAccountDto, QueryAccountDto } from '../dto';
export declare class AccountService {
    private accountRepository;
    private cloundinaryService;
    private connection;
    private historyService;
    private userRepository;
    private mailerService;
    private tagRepository;
    constructor(accountRepository: AccountRepository, cloundinaryService: CloundinaryService, connection: Connection, historyService: HistoryService, userRepository: UserRepository, mailerService: MailerService, tagRepository: TagRepository);
    createAccount(createAccountDto: CreateAccountDto, user: User, files: Array<Express.Multer.File>): Promise<Account>;
    queryAccount(queryAccountDto: QueryAccountDto): Promise<BaseQueryResponse<Account>>;
    removeAccount(id: string): Promise<[...(import("typeorm").DeleteResult | [any, import("typeorm").DeleteResult])[], import("typeorm").DeleteResult | [any, import("typeorm").DeleteResult]]>;
    buyAccountByUser(user: User, id: string): Promise<[User, Account, any, import("@/entity").History]>;
}
