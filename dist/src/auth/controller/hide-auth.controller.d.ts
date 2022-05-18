import { QueryUserDto } from '../dto';
import { AuthService } from '../service';
export declare class HideAuthController {
    private authService;
    constructor(authService: AuthService);
    getAllUser(): Promise<import("../../entity").User[]>;
    getAllUserList(queryUserDto: QueryUserDto): Promise<import("../../core").BaseQueryResponse<import("../../entity").User>>;
}
