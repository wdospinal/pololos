import SupplierModel from "./Supplier.model";

export default interface FactPurchaseModel{
    id:Number;
    supplier:SupplierModel;
    price_to_pay:Number;
    date:Date;
}