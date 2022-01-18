import { Connection,createConnection } from "promise-mysql";
import { key } from "./key";
export default class Conexion{
    private pool:Connection;
    constructor(){
        this.pool = null;
    }
    public async connection():Promise<Connection>{
        this.pool = await createConnection(key);
        return this.pool;
    }
}

