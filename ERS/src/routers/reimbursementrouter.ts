import express from 'express'
import { reimburseserv, getreimbursebysid, getreimbursebyuid, updatereimbursementserv } from '../services/allservices';


export const reimburse = express.Router()



reimburse.post('', async (req, res)=>{
    if(!req.session.user){
        res.status(401), res.send('The incoming token has expired')
    }else{  

            let uid = req.session.user.user_id 
            const {amount, description, reimbursementtype} = req.body
            let user = await reimburseserv(req, uid, amount, description, reimbursementtype)
                res.status(201),res.json(user)
            
    
    }    

})

reimburse.get('/:sid', async (req, res)=>{
    let id = +req.params.sid
    if(!req.session.user){
        res.status(401), res.send('The incoming token has expired')
    }
    else{
        let role = req.session.user.roles
           if(role !== 3){
               res.status(401), res.send('The incoming token has expired (Not in my house)')
           }
           else{
            if(isNaN(id)){
                res.sendStatus(400)
            }else {
                let user = await getreimbursebysid(id)
                    if(user){
                        res.json(user)
                    } else {
                    res.sendStatus(400)
                    }
            }
        }
    }

})

reimburse.get('/userId/:uid', async (req, res)=>{
    
    if(!req.session.user){
        res.status(401), res.send('The incoming token has expired')
    }
    else{
        let id = +req.params.uid
        let role = req.session.user.roles
           if(role !== 3 && req.session.user.user_id !== id){
               res.status(401), res.send('The incoming token has expired (Where do you think you are going?)')
           }
           else{
            if(isNaN(id)){
                res.sendStatus(400)
            }else {
                let user = await getreimbursebyuid(id)
                    if(user){
                        res.json(user)
                    } else {
                    res.sendStatus(400)
                    }
            }
        }
    }

})

reimburse.patch('', async (req, res)=>{
    if(!req.session.user){
        res.status(401), res.send('The incoming token has expired')
    }else{  
        let uroles = req.session.user.roles
         if(uroles !== 3){
            res.status(401), res.send('The incoming token has expired (Who the hell do you think you are!!!)')
        }else {

            const {reimbursementId, author, amount, datesubmitted, dateresolved, description, resolver, status, reimbursementtype} = req.body
            let user = await updatereimbursementserv(req, reimbursementId, author, amount, datesubmitted, dateresolved, description, resolver, status, reimbursementtype)
                res.json(user)
            
        }
    }    

}
)