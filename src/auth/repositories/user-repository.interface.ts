import { CREATE_USER_ENTITY_OMIT_PROPERTIES } from "../constants/mapped-types";
import { UserModel } from "../models/user.model";

export interface UserRepository {
    create(user: Omit<UserModel, (typeof CREATE_USER_ENTITY_OMIT_PROPERTIES)[number]>): Promise<UserModel>;
    findByEmail(email: string): Promise<UserModel | null>;
    findById(id: string): Promise<UserModel | null>;
    findByVerificationToken(verificationToken: string): Promise<UserModel | null>;
    verifyUser(id: string): Promise<void>;
    deleteByEmail(email: string): Promise<UserModel | null>;
}