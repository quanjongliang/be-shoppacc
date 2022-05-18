import { PostRepository, UserRepository } from './repository';
export declare class AppService {
    private userRepository;
    private postRepository;
    constructor(userRepository: UserRepository, postRepository: PostRepository);
    getHello(): string;
    getDataFromExcel(): Promise<import("./entity").User[]>;
    updateSlugPost(): Promise<void>;
}
