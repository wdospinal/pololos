import { Response,Request } from 'express';

export default class IndexRouter{
    public index(req:Request,res:Response):void{
        res.send({message:'Bienvenido a la pagina principal'});
    }
}