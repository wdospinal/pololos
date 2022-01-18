import PersonModel from "./Person.model";
import ProductModel from "./Product.model";

export default interface OrderModel{
    id?:Number;
    table?:Number;
    person?:PersonModel;
    state?:Number;
    date:Date;
    note?:String;
    products?:ProductModel[];
}