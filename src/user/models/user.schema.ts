import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({default: ''})
    fullName: string;

    @Prop({default: ''})
    gender: string;

    @Prop({default: ''})
    location: string;

    @Prop({default: ''})
    phoneNumber: string;

    isAdmin: boolean;

    isDestroy: boolean;

    @Prop({default: Date.now()})
    createdAt: Date;

    @Prop({default: Date.now()})
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
