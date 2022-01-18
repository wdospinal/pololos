import {Request,Response} from 'express';
import Conexion from '../db/Conexion';
import OrderModel from '../models/Order.model';
import ProductModel from '../models/Product.model';
export default class PedidosRouter{
    public async getAll(req:Request,res:Response):Promise<void>{
        try{
            const {key = null} = req.headers;
            if(key === '12345'){
                const connection = await new Conexion().connection();
                const pedidos = await connection.query(`SELECT id,mesa AS 'table',persona_id AS personId,fecha AS date,nota AS note FROM pedido WHERE estado = 0`);
                const dataPedidos:OrderModel[] = [];
                for(let pedido of pedidos){
                    const {id,table,date,note,personId} = pedido;
                    const dataProducts:any[] = await connection.query(`SELECT pxp.producto_id AS id,pd.nombre AS name,pxp.cantidad AS  cant,foto AS photo,categoria_id AS category FROM pedido AS p 
                    INNER JOIN producto_x_pedido AS pxp
                    ON p.id = pxp.pedido_id
                    INNER JOIN producto AS pd 
                    ON pd.id = pxp.producto_id
                    WHERE pxp.pedido_id = ?`,[id]);
                    let products:ProductModel[] = [];
                    let categoryIndex = [0,0,0,0,0,0];
                    for(let d of dataProducts){
                        const {id,name,cant,photo,category} = d;
                        products.push({id,name,cant,photo,category,index:categoryIndex[category-1]});
                        categoryIndex[category-1]++;
                    }
                    dataPedidos.push({id,table,date,note,person:{id:personId},products});
                }
                connection.destroy();
                res.status(200).send({code:200,message:'Pedidos consultados con exito',dataPedidos});
            }else{
                res.status(511).send({error:511,message:'Necesitas autentificacion para acceder a la informacion, verifica la propiedad key'});
            }
        }catch(ex){
            res.status(500).send({code:500,message:'Error en la consulta',exception:ex});
            console.log(ex);
        }
    }
    public async postOrder(req:Request,res:Response):Promise<void>{
        try{
            const {key = null} = req.headers;
            if(key === '12345'){
                const {personId = null,table = null,products = [],note = null} = req.body;
                if(personId !== null || table !== null){
                    if(products.length > 0){
                        const con = await new Conexion().connection();
                        const result = await con.query('INSERT INTO pedido(mesa,persona_id,nota) VALUES(?,?,?)',[table,personId,note]);
                        for(let value of products){
                            const {insertId:pedidoId} = result;
                            const {id,cant} = value;
                            await con.query('INSERT INTO producto_x_pedido(pedido_id,producto_id,cantidad) VALUES(?,?,?)',[pedidoId,id,cant]);
                        }
                        con.destroy();
                        res.send({code:200,message:'Insercion de pedidos realizada con exito'});
                    }
                }else
                res.status(511).send({error:511,message:'Necesitas autentificacion para acceder a la informacion, verifica la propiedad key'});
            }
        }catch(ex){
            res.status(500).send({code:500,message:'Error en la consulta',exception:ex});
        }
    }
}