import { getAllUsers, getAllUsersbyid, findUserByUsernameAndPassword, updateuser, getinfobysid, getinfobyuid, reimburseinfo, updatereimbursementinfo } from "../dao/alldao";
import { Request } from "express";



//this will have all the business logic for getallusers
export async function getAllUsersService(){
    
    return await getAllUsers()
}

//business logic to get all user by id
export async function getAllUsersbyidserv(userid:number){
    
    return await getAllUsersbyid(userid)
}

//business logic to find user by username and password
export async function findUserByUsernameAndPasswordserv(req:Request, username:string, password:string){

    return await findUserByUsernameAndPassword(username,password)
}

//business logic to update user's information
export async function updateuserserv(req:Request, id:number, username:string, password:string, firstname:string, lastname:string, email:string, roles:number){

    return await updateuser(id, username, password, firstname, lastname, email, roles)
}

//business logic to get the reimbursement information by the status id
export async function getreimbursebysid(sid:number){

    return await getinfobysid(sid)
}

//business logic to get the reimbursement information by user id
export async function getreimbursebyuid(uid:number){

    return await getinfobyuid(uid)
}

//business logic to send a reimbursement request 
export async function reimburseserv(req:Request, uid:number, amount:number, description:number, reimbursementtype:number){

    return await reimburseinfo(uid, amount, description, reimbursementtype)
}

//business logic for the update reimbursement information
export async function updatereimbursementserv(req:Request, reimbursementId:number, author:number, amount:number, datesubmitted:string, dateresolved:string, description:string, resolver:number, status:number, reimbursementtype:number){

    return await updatereimbursementinfo(reimbursementId, author, amount, datesubmitted, dateresolved, description, resolver, status, reimbursementtype)
}



