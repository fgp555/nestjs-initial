import { UserService } from '../user.service';
export declare class UserSeederService {
    private readonly userService;
    constructor(userService: UserService);
    seed(): Promise<void>;
}
