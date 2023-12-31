import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/users.schemas';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema : UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
})

export class UsersModule {}


