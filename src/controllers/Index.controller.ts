import {Router,Request,Response} from 'express';
import IndexRouter from '../routers/Index.router';
export default class IndexController{
    public readonly router:Router;
    constructor(){
        this.router = Router();
        this.configRouters();
    }
    private configRouters():void{
        const indexRouter:IndexRouter = new IndexRouter();
        this.router.get('/',indexRouter.index);
    }
}
