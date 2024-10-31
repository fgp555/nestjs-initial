import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserSeederService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    seed(): Promise<void>;
}
