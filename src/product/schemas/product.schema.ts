import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

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
export class Product {
 
  id?:string;

  @Prop({required:true})
  name: string;

  @Prop({required:true})
  price: number;

}

export const ProductSchema =  SchemaFactory.createForClass(Product);
