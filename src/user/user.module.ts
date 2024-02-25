import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.enitity';
import { Role } from './entities/role.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Role])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
