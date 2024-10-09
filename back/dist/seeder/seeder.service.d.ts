import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
export declare class SeederService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    seed(): Promise<void>;
}
