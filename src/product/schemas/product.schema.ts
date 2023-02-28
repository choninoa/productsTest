import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  mongoose, { HydratedDocument } from 'mongoose';
import { Warehouse } from '../../warehouse/schemas/warehouse.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps:{
    createdAt:true,
    updatedAt:true
  },  
  toJSON:{
    virtuals:true,
    versionKey:false,
    transform: (doc, ret)=> {   delete ret._id  },    
  }  
})
export class Product {
 
  id?:string;

  @Prop({required:true})
  name: string;

  @Prop({required:true})
  description: string;

  @Prop({required:true})
  price: number;

  @Prop({required:true,default:1})
  counter: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse',auto:true})
  warehouse: Warehouse;

}

export const ProductSchema =  SchemaFactory.createForClass(Product);

