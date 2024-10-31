import { UserSeederService } from './seed/user.seeder';
export declare class UserModule {
    private userSeederService;
    constructor(userSeederService: UserSeederService);
    private seed;
}
