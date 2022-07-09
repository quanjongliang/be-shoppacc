import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import {Cache} from 'cache-manager'
@Injectable()
export class RedisCacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){}

    public async get(key:string){
        return  this.cacheManager.get(key);
    }

    public async set<T>(key:string,value:T){
        await this.cacheManager.set(key,value)
    }

    public async del(key:string){
        await this.cacheManager.del(key)
    }

  
}
