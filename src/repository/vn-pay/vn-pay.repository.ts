import { VnPay } from "@/entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(VnPay)
export class VnPayRepository extends Repository<VnPay> {}
