import { User } from '@/entity';
import { CreateAuditByAdminDto, CreateAuditDto, QueryAuditDto } from '../dto';
import { AuditService } from '../service';
export declare class AuditController {
    private auditService;
    constructor(auditService: AuditService);
    createNewAudit(user: User, createAuditDto: CreateAuditDto): Promise<[import("@/entity").Audit, any, import("@/entity").History]>;
    createAuditByAdmin(user: User, createAuditByAdmin: CreateAuditByAdminDto): Promise<[User, import("@/entity").Audit, import("@/entity").History]>;
    getAuditHistory(user: User, queryAuditDto: QueryAuditDto): Promise<import("@/core").BaseQueryResponse<import("@/entity").Audit>>;
    getAllAuditHistory(queryAuditDto: QueryAuditDto): Promise<import("@/core").BaseQueryResponse<import("@/entity").Audit>>;
    updateStatusAudit(user: User, id: string): Promise<[import("@/entity").History, import("typeorm").UpdateResult]>;
}
