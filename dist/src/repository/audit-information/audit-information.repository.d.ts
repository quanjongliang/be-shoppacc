import { AuditInformationDto } from '@/audit';
import { AuditInformation } from '@/entity';
import { Repository } from 'typeorm';
export declare class AuditInformationRepository extends Repository<AuditInformation> {
    createAuditInformations(auditInformations: AuditInformationDto[]): Promise<AuditInformation[]>;
}
