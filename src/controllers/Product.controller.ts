import {Router} from 'express';
import ProductRouter from '../routers/Product.router';
export default class ProductController{
    public readonly router:Router;
    private productRouters:ProductRouter;
    constructor(){
        this.router = Router();
        this.productRouters = new ProductRouter();
        this.configRouter();
    }
    private configRouter():void{
        this.router.get('/',this.productRouters.getProducts);
        this.router.put('/:id',this.productRouters.updateCant);
        this.router.get('/categoria/:id',this.productRouters.getProductsByCategory);
        this.router.get('/categoria',this.productRouters.getProductsByCategories);
        this.router.post('/vender',this.productRouters.postSalesProduct);
        this.router.post('/agregar',this.productRouters.postAddProducts);
    }
}
