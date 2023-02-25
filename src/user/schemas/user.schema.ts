import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps:{
    createdAt:true,
    updatedAt:true
  },  
  toJSON:{
    virtuals:true,
    versionKey:false,
    transform: (doc, ret)=> {   delete ret._id  }
  }
})
export class User {
 
  id?:string;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  age: number;

  @Prop()
  email: string;

  @Prop()
  phone: string;
  
}

export const UserSchema =  SchemaFactory.createForClass(User);
/*new mongoose.Schema(User,{
  timestamps:{
    createdAt:true,
    updatedAt:true
  },  
  toJSON:{
    virtuals:true,
    versionKey:false,
    transform: (doc, ret)=> {   delete ret._id  }
  }
});*/