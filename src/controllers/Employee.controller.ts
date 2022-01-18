import {Router} from 'express';
import EmployeeRouter from '../routers/Employee.router';
export default class EmployeeController{
    public readonly router:Router;  
    constructor(){
        this.router = Router();
        this.configRouter();
    }
    private configRouter():void{
        const employeeRouter = new EmployeeRouter();
        this.router.post('/login',employeeRouter.login);
    }
}