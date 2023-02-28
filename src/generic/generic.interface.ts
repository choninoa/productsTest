import { Request,Response } from "express";
export interface GenericController<CLASS, CreateDTO, UpdateDTO> {
     create(dto: CreateDTO): Promise<CLASS>;
     findAll(req?:Request): Promise<CLASS[]>;   
     findOne( id: string): Promise < CLASS > ;
     update(id: string, dto: UpdateDTO);
     delete (id: string): Promise < CLASS >;
}