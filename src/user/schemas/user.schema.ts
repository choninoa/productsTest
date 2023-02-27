import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export enum UserRolesEnum{
BUYER="BUYER", //COMPRADORES
ADMIN="ADMIN"//ADMINISTRADORES
}
@Schema({
  timestamps:{
    createdAt:true,
    updatedAt:true
  },
  id:true,  
  toJSON:{
    virtuals:true,
    versionKey:false,
    transform: (doc, ret)=> {   delete ret._id  }
  }
})
export class User {
 
  id?:string;

  @Prop({required:true})
  name: string;

  @Prop({required:true})
  lastName: string;

  @Prop()
  age?: number;

  @Prop({required:true})
  email: string;

  @Prop({required:true})
  phone: string;

  @Prop({required:true,minlength:8})
  passwd: string;
  
  @Prop({required:true,enum:UserRolesEnum})
  role:UserRolesEnum;
}

export const UserSchema =  SchemaFactory.createForClass(User);
