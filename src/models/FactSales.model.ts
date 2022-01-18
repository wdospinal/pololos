import ClientModel from "./Client.model";

export default interface FactSalesModel{
    id:Number;
    client?:ClientModel;
    price_to_pay?:Number;
    date?:Date;
    iva?:Number;
}