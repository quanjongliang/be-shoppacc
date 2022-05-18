import { Account } from '@/entity';
import { Repository } from 'typeorm';
export declare class AccountRepository extends Repository<Account> {
    checkExistAccount(id: string): Promise<Account>;
}
