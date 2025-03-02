import mongoose from 'mongoose';
import { User as UserEntity} from '../entities/user.entity';
import { UserModel } from '../models/user.model';

export class UserMapper {
  static toEntity(userModel: UserModel): UserEntity {
    const user = new UserEntity();
    user.username = userModel.username;
    user.email = userModel.email;
    user.password = userModel.password;
    user.isVerified = userModel.isVerified;
    user.verificationToken = userModel.verificationToken;
    return user;
  }

  static toModel(userEntity: UserEntity): UserModel {
    const userModel = new UserModel();
    userModel.id = (userEntity._id as mongoose.Types.ObjectId).toString();
    userModel.username = userEntity.username;
    userModel.email = userEntity.email;
    userModel.password = userEntity.password;
    userModel.isVerified = userEntity.isVerified;
    userModel.verificationToken = userEntity.verificationToken;
    userModel.createdAt = userEntity.createdAt;
    userModel.updatedAt = userEntity.updatedAt;
    
    return userModel;
  }
}

