import { Response, Request } from 'express';
import Conexion from "../db/Conexion";
import ProductHelper from '../helpers/Product.helper';
import CategoryModel from '../models/Category.model';
import ProductModel from '../models/Product.model';
export default class ProductRouter{
    constructor(){
        
    }
    public async getProducts(req:Request,res:Response):Promise<void>{
        const conextion = await new Conexion().connection();
        const result = await conextion.query(`SELECT p.id,p.nombre AS 'name',foto AS 'photo',precio_unitario AS 'priceUnit',cantidad AS 'cant',categoria_id AS'categoryId',
        c.nombre AS 'categoryName'
        FROM producto AS p
        INNER JOIN categoria AS c
        ON p.categoria_id = c.id
        `);
        let data:ProductModel[] = [];
        result.forEach((value)=>{
            const {id,name,photo,priceUnit,cant,categoryId,categoryName} = value;
            data.push({id,cant,category:{id:categoryId,name:categoryName},photo,name,priceUnit});
        });
        conextion.destroy();
        res.send(data);
    }
    public async updateCant(req:Request,res:Response):Promise<void>{
        const {cant = 0}= req.body;
        const {id}=req.params;
        const conexion = await new Conexion().connection();
        conexion.destroy();
        res.send(await conexion.query('UPDATE producto SET cantidad=? WHERE id = ?',[cant,id]));
    }
    public async getProductsByCategory(req:Request,res:Response){
        const {key = null} = req.headers;//Tambien podria pedirlo por los headers y modificar el cors para que permita el TOKEN o la api_key o como e quiera llamar req.token
        if(key === '12345'){
            try{
                const conextion = await new Conexion().connection();
                const {id} = req.params;
                const result = await conextion.query(`SELECT p.id,p.nombre AS 'name',foto AS 'photo',precio_unitario AS 'priceUnit',cantidad AS 'cant',categoria_id AS'categoryId',
                c.nombre AS 'categoryName'
                FROM producto AS p
                INNER JOIN categoria AS c
                ON p.categoria_id = c.id
                WHERE c.id = ?`,[id]);
                let data:ProductModel[] = [];
                let index = 0;
                result.forEach((value)=>{
                    const {id,name,photo,priceUnit,cant,categoryId,categoryName} = value;
                    data.push({id,cant,category:{id:categoryId,name:categoryName},photo,name,priceUnit,index});
                    index++;
                });
                res.status(200).send(data);
            }catch(e){
                res.status(500).send({error:500, message:'Se a producido un error',exception:e});
            }
            
        }else
            res.status(511).send({error:511,message:'Necesitas autentificacion para acceder a la informacion, verifica la propiedad key'});
    }
    public async getProductsByCategories(req:Request,res:Response){
        const {key} = req.headers;
        try{
            if(key === '12345'){
                const connection = await new Conexion().connection();
                const categories:CategoryModel[] = await connection.query('SELECT id,nombre FROM categoria ORDER BY id ASC');
                let result = [];
                for(let category of categories){
                    const data = await connection.query(`SELECT p.id,p.nombre AS 'name',foto AS 'photo',precio_unitario AS 'priceUnit',cantidad AS 'cant',categoria_id AS'categoryId',
                    c.nombre AS 'categoryName'
                    FROM producto AS p
                    INNER JOIN categoria AS c
                    ON p.categoria_id = c.id
                    WHERE c.id = ?`,[category.id]);
                    let index = 0;
                    for(let d of data){
                        const {categoryId:id,categoryName:name} = d;
                        delete d.categoryId;
                        delete d.categoryName;
                        d.category = {id,name};
                        d.index = index;
                        index++;
                    }
                    result.push(data);
                }
                res.status(200).send(result);
            }else{
                res.status(511).send({error:511,message:'Necesitas autentificacion para acceder a la informacion, verifica la propiedad key'});
            }
        }catch(e){
            res.status(500).send({error:500, message:'Se a producido un error',exception:e});
        }
    }
    public async postSalesProduct(req:Request,res:Response):Promise<void>{
        const {key = null} = req.headers;
        if(key === '12345'){
            try{
                const conexion = await new Conexion().connection();
                const {person:personData,sales} = req.body;
                const {identification} = personData;
                let priceToPay = 0;
                for(const value  of sales){
                    const {cant,price,productId} = value;
                    priceToPay+= cant*price;
                    await new ProductHelper().updateCantData(productId,cant);
                }
                let iva = 0;
                priceToPay += iva = (priceToPay*0.16);
                const client= (await conexion.query('SELECT id FROM persona WHERE cedula = ?',[identification]))[0];
                let clientId = client?client.id:0;
                if(!clientId){
                    const {name,phone,direction} = personData;
                    const insert = await conexion.query('INSERT INTO persona(cedula,nombre,telefono,direccion) VALUES(?,?,?,?)',[identification,name,phone,direction]);
                    
                    const client= await conexion.query('INSERT INTO cliente(persona_id) VALUES(?)',[insert.insertId]);
                    clientId = client.insertId;
                }
                    await conexion.query(`INSERT INTO factura_venta(cliente_id,precio_a_pagar,fecha,iva) VALUES(?,?,?,?)`,[clientId,priceToPay,new Date(),iva]);
                    const {id}= (await conexion.query(`SELECT id FROM factura_venta ORDER BY id DESC LIMIT 1`))[0];
                    for(let value of sales){
                        const {cant,price,productId} = value;
                        await conexion.query(`INSERT INTO venta(factura_venta_id,precio,cantidad,producto_id) VALUES(?,?,?,?)`,[id,price,cant,productId]);
                    }
                    conexion.destroy();
                    res.status(200).send({identification,sales,priceToPay,iva});
            }catch(e){
                
                res.status(500).send({code:500, message:'Se a producido un error',exception:e});
            }
        }else
            res.status(511).send({code:511,message:'Necesitas autentificacion para acceder a la informacion, verifica la propiedad key'});
        
    }
    public async postAddProducts(req:Request, res:Response):Promise<void>{
        const {name,photo = null,price_unit,cant,category} = req.body 
        const {key = null} = req.headers;
        if(key === '12345'){
            try{
                const con = await new Conexion().connection();
                await con.query('INSERT INTO producto(nombre,foto,precio_unitario,cantidad,categoria_id) VALUES(?,?,?,?,?)',[name,photo,price_unit,cant,category]);
                con.destroy();
                res.status(200).send({code:200,message:'Se a registrado correctamente el nuevo producto'});
            }catch(e){
                res.status(500).send({code:500, message:'Se a producido un error',exception:e});
            }
        }else
            res.status(511).send({code:511,message:'Necesitas autentificacion para acceder a la informacion, verifica la propiedad key'});
    }
}