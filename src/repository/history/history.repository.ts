import { History, HISTORY_TYPE } from "@/entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {
  async saveNewHistory(historyMessage: string, type: HISTORY_TYPE,information:string): Promise<History> {
    return this.save(
      this.create({
        historyMessage,
        type,
        information
      })
    )
  }
}
