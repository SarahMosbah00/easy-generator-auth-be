import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  public readonly _id?: Types.ObjectId;
  @Prop({ required: true, minlength: 3, trim: true })
  username: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ default: false })
  isVerified?: boolean;

  @Prop()
  verificationToken?: string;

  @Prop()
  public readonly createdAt?: Date;

  @Prop()
  public readonly updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

export const USER_SCHEMA_DEFINATION = {
  name: User.name,
  schema: UserSchema,
} satisfies ModelDefinition;
