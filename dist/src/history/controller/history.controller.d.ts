import { QueryHistoryDto } from '../dto';
import { HistoryService } from '../service';
export declare class HistoryController {
    private historyService;
    constructor(historyService: HistoryService);
    getHistory(queryHistoryDto: QueryHistoryDto): Promise<import("../../core").BaseQueryResponse<import("../../entity").History>>;
}
