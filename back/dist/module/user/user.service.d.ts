import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findOne(id: string): Promise<UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    remove(id: string): Promise<UserEntity>;
}
