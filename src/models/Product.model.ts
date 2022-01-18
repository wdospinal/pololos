import CategoryModel from "./Category.model";

export default interface ProductModel{
    id?:Number;
    name?:String;
    photo?:String;
    priceUnit?:Number;
    cant?:Number;
    category?:CategoryModel;
    index?:Number;
}