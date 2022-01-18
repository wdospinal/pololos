import UserModel from './User.model';
export default interface PersonModel{
    id?:Number;
    name?:String;
    identification?:String;
    phone?:String;
    direction?:String;
    user?:UserModel;
}