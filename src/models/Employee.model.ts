import PositionModel from "./Position.model";
import PersonModel from "./Person.model";
import UserModel from "./User.model";
export default interface EmployeeModel{
    id:number;
    person?:PersonModel
    position?:PositionModel;
    salary?:number;
    commission?:number;
    user?:UserModel

}