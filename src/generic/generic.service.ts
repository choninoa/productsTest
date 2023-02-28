import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, HydratedDocument, Model, PopulateOptions, QueryWithHelpers, UpdateWriteOpResult } from 'mongoose';



export class GenericService<CLASS, DTO,UDTO> {
  constructor(

    readonly genericModel: Model<HydratedDocument<CLASS>>,
  ) { }

  async create(dto: DTO): Promise<CLASS> {
    return await this.genericModel.create(dto);
  }

  async findAll(): Promise<CLASS[]> {
    return this.genericModel.find();
  }

  async findOne(query: FilterQuery<CLASS>): Promise<CLASS> {
    const doc=await this.genericModel.findOne(query,null,{
      strict:true
    }).exec();
      if(!doc)
      throw new NotFoundException(`${this.genericModel.modelName} not found!`)
    return doc
  }

  async update(id:string,dto: UDTO) {
    return await this.genericModel.updateOne({ _id: Object(id) },dto);
  }

  async delete(id: string) {
    return await this.genericModel.findByIdAndRemove(id)
      
  }

  getModel() {
    return this.genericModel;
  }
}


