import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model, QueryWithHelpers, UpdateWriteOpResult } from 'mongoose';



export class GenericService<CLASS, DTO,UDTO> {
  constructor(

    readonly genericModel: Model<HydratedDocument<CLASS>>,
  ) { }

  async create(dto: DTO): Promise<CLASS> {
    return await this.genericModel.create(dto);
  }

  async findAll(): Promise<CLASS[]> {
    return await this.genericModel.find();
  }

  async findOne(id: string): Promise<CLASS> {
    return await this.genericModel.findOne({ _id: id });
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


