import { PoolClient } from "pg";
import { connectionPool } from ".";
import { sqlUsertojsUSer } from "../util/userconverter";
import { sqlreimbursement } from "../util/reimburseconverter";





//we are allowing getAllUsers to be added to our c++ apis
export async function getAllUsers(){
    let client:PoolClient
    //Promise
    try{
        client = await connectionPool.connect()//await says, wait for the promise to resolve
        //all code beneath the await will become a callback after the await is done
        let result = await client.query('SELECT * FROM "ers".users')
        return result.rows.map(sqlUsertojsUSer)
    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }
}

//find users by id
export async function getAllUsersbyid(userid:number){
    let client:PoolClient
 
    //Promise
    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT * FROM "ers".users where user_id = $1`, [userid])
        if(!result.rows[0]){
            return 'User not found'
        }    
        return result.rows.map(sqlUsertojsUSer)
      
    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }

}

//find the user after a successful login using the username and password
export async function findUserByUsernameAndPassword(username:string, password:string){
    let client:PoolClient
//Promise
    try{
        client = await connectionPool.connect()
        let query = 'SELECT * FROM "ers".users WHERE username = $1 and pass_word = $2'
        let result = await client.query(query, [username, password])
        if(!result.rows[0]){
            return 'User does not exist'
        }
        return sqlUsertojsUSer(result.rows[0])

    }catch(err){
        console.log(err);
        return 'Internal'
    } finally{
        client && client.release()
    }
}

//update all fields of the user
export async function updateuser(id:number, username:string, password:string, firstname:string, lastname:string, email:string, roles:number){
    let client:PoolClient
    
    //Promise
    try{
        client = await connectionPool.connect()
        let query = 'BEGIN;'
        await client.query(query)
        let query1 = `UPDATE "ers".users SET username = $1, pass_word = $2, firstName = $3, lastName = $4, email = $5, roles = $6 WHERE user_id = $7;`
        await client.query(query1, [username, password, firstname, lastname, email, roles, id])
        let query2 = 'COMMIT;'
        await client.query(query2)
        let query3 = 'SELECT * FROM "ers".users WHERE user_id = $1'
        let result = await client.query(query3, [id])
        
        if(!result.rows[0]){
            return 'User not found'
        }
        return sqlUsertojsUSer(result.rows[0])

    }catch(err){
        client.query('ROLLBACK;')
        console.log(err);
        return 'Internal'
    } finally{
        client && client.release()
    }
}

//get all the information from the reimbursement table in the database by the status
export async function getinfobysid(sid:number){
    let client:PoolClient
 
    //Promise
    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT * FROM "ers".reimbursement WHERE status = $1`, [sid])
        if(!result.rows[0]){
            return 'User not found'
        }    
        return result.rows.map(sqlreimbursement)
      
    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }

}

//get reimbursement information by the user id on url
export async function getinfobyuid(uid:number){
    let client:PoolClient
 
    //Promise
    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT * FROM "ers".reimbursement WHERE author = $1`, [uid])
        if(!result.rows[0]){
            return 'User not found'
        }    
        return result.rows.map(sqlreimbursement)
      
    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }

}

//get reimbursement information by user id input
export async function getinfobyuidinput(uid:number){
    let client:PoolClient
 
    //Promise
    try{
        client = await connectionPool.connect()
        let result = await client.query(`SELECT * FROM "ers".reimbursement WHERE author = $1`, [uid])
        if(!result.rows[0]){
            return 'User not found'
        }    
        return result.rows.map(sqlreimbursement)
      
    }catch(err){
        console.log(err); 
        return 'Internal Server'
    } finally{
        client && client.release()
    }

}

//function for submitting a reimbursement request
export async function reimburseinfo(uid:number, amount:number, description:number, reimbursementtype:number){
    let client:PoolClient
    
    //Promise
    try{
        client = await connectionPool.connect()
        let query = 'BEGIN;'
        await client.query(query)
        let query1 = `INSERT INTO "ers".reimbursement(author, amount, dateSubmitted, dateResolved, description, resolver, status, reimbursementtype) values($1, $2, CURRENT_DATE, 'Unresolved', $3, NULL, 2, $4);`
        await client.query(query1, [uid, amount, description, reimbursementtype])
        let query2 = 'COMMIT;'
        await client.query(query2)
        let query3 = 'SELECT * FROM "ers".reimbursement WHERE author = $1 AND status = 2' 
        let result = await client.query(query3, [uid])
        if(!result.rows[0]){
            return 'reimbursement not found'
        }

        return result.rows.map(sqlreimbursement)

    }catch(err){
        client.query('ROLLBACK;')
        console.log(err);
        return 'Internal'
    } finally{
        client && client.release()
    }
}

//function to update the reimbursement infomation for a users
export async function updatereimbursementinfo(reimbursementId:number, author:number, amount:number, datesubmitted:string, dateresolved:string, description:string, resolver:number, status:number, reimbursementtype:number){
    let client:PoolClient
    
    //Promise
    try{
        client = await connectionPool.connect()
        let query = 'BEGIN;'
        await client.query(query)
        let query1 = `UPDATE "ers".reimbursement SET author = $2, amount = $3, datesubmitted = $4, dateresolved = $5, description = $6, resolver = $7, status = $8, reimbursementtype = $9  WHERE reimbursementId = $1;`
        await client.query(query1, [reimbursementId, author, amount, datesubmitted, dateresolved, description, resolver, status, reimbursementtype])
        let query2 = 'COMMIT;'
        await client.query(query2)
        let query3 = 'SELECT * FROM "ers".reimbursement WHERE reimbursementId = $1 AND author = $2'
        let result = await client.query(query3, [reimbursementId, author])
        
        if(!result.rows[0]){
            return 'User not found'
        }
        return sqlreimbursement(result.rows[0])

    }catch(err){
        client.query('ROLLBACK;')
        console.log(err);
        return 'Internal'
    } finally{
        client && client.release()
    }
}