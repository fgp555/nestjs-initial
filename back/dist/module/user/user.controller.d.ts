import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findByEmail(email: string): Promise<UserEntity>;
    findOne(id: string): Promise<UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    remove(id: string): Promise<UserEntity>;
}
