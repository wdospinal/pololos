import { Router } from 'express';
import PedidosRouter from '../routers/Pedidos.router';
export default class PedidosController{
    public readonly router:Router;
    constructor(){
        this.router = Router();
        this.config();
    }
    private config():void{  
        this.router.get('/',new PedidosRouter().getAll);
        this.router.post('/pedir',new PedidosRouter().postOrder);
    }
}