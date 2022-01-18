import PersonModel from "./Person.model";
import UserModel from "./User.model";

export default interface ClientModel{
    id:Number;
    person:PersonModel;
    user:UserModel;
}