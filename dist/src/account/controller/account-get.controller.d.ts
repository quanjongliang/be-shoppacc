import { QueryAccountDto } from '../dto';
import { AccountService } from '../service';
export declare class AccountGetController {
    private accountService;
    constructor(accountService: AccountService);
    queryAccount(queryAccountDto: QueryAccountDto): Promise<import("../../core").BaseQueryResponse<import("../../entity").Account>>;
}
