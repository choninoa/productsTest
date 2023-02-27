import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type WarehouseDocument = HydratedDocument<Warehouse>;

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
export class Warehouse {
 
  id?:string;

  @Prop({required:true})
  name: string;

}

export const WarehouseSchema =  SchemaFactory.createForClass(Warehouse);
