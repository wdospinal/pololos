import ProductModel from "./Product.model";

export default interface SalesModel{
    id:Number;
    cant:Number;
    price:Number;
    product:ProductModel;
}