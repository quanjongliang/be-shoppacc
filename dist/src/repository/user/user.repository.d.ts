import { User } from '@/entity';
import { Repository } from 'typeorm';
export declare class UserRepository extends Repository<User> {
    checkExistUser(id: string): Promise<User>;
}
