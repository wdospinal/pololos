import ArticleModel from "./Article.model";
import FactPurchaseModel from "./FactPurchase.model";

export default interface PurchaseModel{
    id:Number;
    article?:ArticleModel;
    fact?:FactPurchaseModel;
    price?:Number;
    cant?:Number;

}