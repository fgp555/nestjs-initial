import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
import { UserSeederService } from './seed/user.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserSeederService],
  exports: [UserService],
})
export class UserModule {
  constructor(private userSeederService: UserSeederService) {
    this.seed();
  }
  private async seed() {
    await this.userSeederService.seed();
  }
}
