import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QueryHistoryDto } from "../dto";
import { HistoryInterceptor } from "../interceptor";
import { HistoryService } from "../service";

@Controller("history")
@ApiTags("history")
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  @UseInterceptors(HistoryInterceptor)
  async getHistory(@Query() queryHistoryDto: QueryHistoryDto) {
    return this.historyService.queryHistory(queryHistoryDto);
  }
}
