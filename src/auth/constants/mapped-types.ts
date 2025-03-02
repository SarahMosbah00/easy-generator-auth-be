import { User as UserEntity } from "../entities/user.entity";
import { UserModel } from "../models/user.model";

export const CREATE_USER_OMIT_PROPERTIES = [
    'id',
    'createdAt',
    'updatedAt',
    'isVerified',
    'verificationToken',  
] satisfies readonly (keyof UserModel)[];


export const CREATE_USER_ENTITY_OMIT_PROPERTIES = [
    '_id',
    'createdAt',
    'updatedAt',
    'isVerified',  
] satisfies readonly (keyof UserEntity)[];




