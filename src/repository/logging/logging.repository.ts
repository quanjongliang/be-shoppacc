import { Logging } from "@/entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Logging)
export class LoggingRepository extends Repository<Logging> {}
