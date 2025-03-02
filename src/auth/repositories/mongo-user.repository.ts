import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserEntity } from '../entities/user.entity';
import { Model } from 'mongoose';
import { UserModel } from '../models/user.model';
import { UserMapper } from '../mappers/user.mapper';
import { Types } from 'mongoose';
import { UserRepository } from './user-repository.interface';

@Injectable()
export class MongoUserRepository implements UserRepository {
  public constructor(
    @InjectModel(UserEntity.name)
    private readonly usersModel: Model<UserEntity>,
  ) {}


  public async findByVerificationToken(verificationToken: string): Promise<UserModel | null> {
    const userEntity = await this.usersModel.findOne({ verificationToken }).exec();
    return userEntity ? UserMapper.toModel(userEntity) : null;
  }

  public async create(user: UserModel): Promise<UserModel> {
    const userEntity = UserMapper.toEntity(user);
    const createdUser = new this.usersModel(userEntity);
    const savedUser = await createdUser.save();
    return UserMapper.toModel(savedUser);
  }

  public async findByEmail(email: string): Promise<UserModel | null> {
    const userEntity = await this.usersModel.findOne({ email }).exec();
    return userEntity ? UserMapper.toModel(userEntity) : null;
  }

  public async findById(id: string): Promise<UserModel | null> {
    const _id = new Types.ObjectId(id);
    const userEntity = await this.usersModel.findById(_id).exec();
    return userEntity ? UserMapper.toModel(userEntity) : null;
  }

  public async verifyUser(id: string): Promise<void> {
    const _id = new Types.ObjectId(id);
    await this.usersModel.findByIdAndUpdate(_id, { isVerified: true }).exec();
    
  }

  public async updateRefreshToken(id: string, refreshTokenHash: string): Promise<void> {
    const _id = new Types.ObjectId(id);
    await this.usersModel.findByIdAndUpdate(_id, { refreshTokenHash });
  }

  public async delete(id: string): Promise<UserModel | null> {
    const _id = new Types.ObjectId(id);
    const deletedUser = await this.usersModel.findByIdAndDelete(_id).exec();
    return deletedUser ? UserMapper.toModel(deletedUser) : null;
  }
}
