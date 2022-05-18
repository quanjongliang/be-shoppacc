import { Strategy } from 'passport-jwt';
import { PayloadTokenUser } from '@/entity';
import { UserRepository } from '@/repository';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: PayloadTokenUser): Promise<import("@/entity").User>;
}
export {};
