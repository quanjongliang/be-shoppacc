import { Module, CacheModule as BaseCacheModule } from '@nestjs/common';
import { RedisCacheService } from './redis.service';
import * as redisStore from 'cache-manager-ioredis'

@Module({
  imports:[
    BaseCacheModule.registerAsync({
      useFactory: ()=>{
        return {
          store:redisStore,
          host: process.env.REDIS_HOST,
          port:process.env.REDIS_PORT,
          ttl:60*3600*10000
        }
      }
    })
  ],
  providers: [RedisCacheService],
  exports:[BaseCacheModule, RedisCacheService]
})
export class RedisModule {}
