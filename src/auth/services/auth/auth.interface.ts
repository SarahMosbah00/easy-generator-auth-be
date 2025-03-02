import { CREATE_USER_OMIT_PROPERTIES } from "../../constants/mapped-types";
import { UserModel } from "../../models/user.model";

export interface AuthService {
    signUp(user: Omit<UserModel, (typeof CREATE_USER_OMIT_PROPERTIES)[number]>): Promise<void>;
    signIn(email: string, password: string): Promise<string>;
    verify(token: string): Promise<void>;
}