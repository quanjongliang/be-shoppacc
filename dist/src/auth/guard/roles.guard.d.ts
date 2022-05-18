import { UserRepository } from '@/repository';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private userRepository;
    constructor(reflector: Reflector, userRepository: UserRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
