import Conexion from "../db/Conexion";
export default class ProductHelper{
    public async updateCantData(id:Number,cantSale:Number):Promise<any>{
        try{
            const conexion = await new Conexion().connection();
            const result = await conexion.query('SELECT cantidad AS cant FROM producto WHERE id = ?',[id]);
            const {cant} = result[0];
            if(cant){
                if(cant-Number(cantSale) >= 0){
                    conexion.query('UPDATE producto SET cantidad=? WHERE id = ?',[cant - Number(cantSale),id]);
                    return {message:'Se realizo correctamente la actualizacion'};
                }else
                    return {error:1,message:'No se puede realizar la actualizacion de la compra, ya que la cantidad se excede'};
            }else
                return {error:2,message:'No se puede realizar la actualizacion de la compra, ya que la cantidad es 0'};
        }catch(e){
            console.log(e);
            return {error:3, message:'Se genero una exception en el codigo',exception:e};
        }
    }
}