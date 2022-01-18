import { Connection } from "promise-mysql";
import Conexion from "../db/Conexion";
import {Request,Response} from 'express';
import EmployeeModel from '../models/Employee.model';
export default class EmployeeRouter{
    public async login(req:Request,res:Response):Promise<any>{
        const connection:Connection = await new Conexion().connection();
        const {user,password} = req.body;
        const {key=null} = req.headers;
        if(key === '12345'){
            const result = await connection.query(`SELECT emp.id,p.nombre AS 'name',p.cedula AS 'identification',p.direccion AS 'direction',p.telefono AS 'phone',emp.sueldo AS 'salary', 
                p.id AS 'personId',emp.comision AS 'commision',
                c.id AS 'cargoId',
                c.nombre AS 'positionName'
                FROM usuario AS us
                INNER JOIN empleado AS emp 
                ON us.id = emp.usuario_id
                INNER JOIN persona AS p 
                ON p.id = emp.persona_id
                INNER JOIN cargo AS c
                ON emp.cargo_id = c.id
                WHERE usuario = ? AND contrasenia = ?`,[user,password]);
                if(result[0]){
                    const {id,name,identification,phone,direction,commission,salary,personId,cargoId,positionName} = result[0];
                    let employee:EmployeeModel = {
                        id,commission,salary,person:{id:personId,direction,name,phone,identification},position:{id:cargoId,name:positionName}
                    }
                    res.status(200).send(employee);
                }else{
                    res.status(403).send({id:null,message:'No se encontro el empleado'});
                }
                
        }else
            res.status(403).send({error:'401',message:'No puedes pasar sin la key'});
        
    }
}