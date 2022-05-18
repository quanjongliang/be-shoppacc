import { BaseQueryResponse } from '@/core';
import { Audit, History, User } from '@/entity';
import { MailerService } from '@/mailer';
import { AuditInformationRepository, AuditRepository, UserRepository } from '@/repository';
import { CreateAuditByAdminDto, CreateAuditDto, QueryAuditDto } from '../dto';
import { Connection } from 'typeorm';
import { HistoryService } from '@/history';
export declare class AuditService {
    private auditRepository;
    private userRepository;
    private auditInformationRepository;
    private mailerService;
    private connection;
    private historyService;
    constructor(auditRepository: AuditRepository, userRepository: UserRepository, auditInformationRepository: AuditInformationRepository, mailerService: MailerService, connection: Connection, historyService: HistoryService);
    createNewAudit(user: User, createAuditDto: CreateAuditDto): Promise<[Audit, any, History]>;
    createAuditByAdmin(user: User, createAuditByAdminDto: CreateAuditByAdminDto): Promise<[User, Audit, History]>;
    queryAuditByUser(queryAuditDto: QueryAuditDto, user?: User): Promise<BaseQueryResponse<Audit>>;
    updateStatusAudit(user: User, id: string): Promise<[History, import("typeorm").UpdateResult]>;
}
