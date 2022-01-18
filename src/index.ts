import {Application} from 'express';
import EmployeeController from './controllers/Employee.controller';
import IndexController from './controllers/Index.controller';
import PedidosController from './controllers/Pedidos.controller';
import ProductController from './controllers/Product.controller';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
class Server{
    private app:Application;
    constructor(){
        this.app = express();
        this.config();
    }
    private config():void{
        this.app.set('PORT',4500 || process.env.PORT);
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use('/',new IndexController().router);
        this.app.use('/empleado',new EmployeeController().router);
        this.app.use('/producto',new ProductController().router);
        this.app.use('/pedidos',new PedidosController().router)
    }
    public start():void{
        this.app.listen(this.app.get('PORT'),()=>{
            console.log('Hemos montado el servidor en el puerto:',this.app.get('PORT'));
        });
    }
}
new Server().start();
