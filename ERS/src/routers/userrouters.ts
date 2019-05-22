import express from 'express'
import {findUserByUsernameAndPasswordserv, getAllUsersbyidserv, getAllUsersService, updateuserserv} from '../services/allservices';



export const user = express.Router()

//router function to handle user login using POST
user.post('', async (req, res)=>{
    const {username, password} = req.body
    let user = await findUserByUsernameAndPasswordserv(req, username, password)
    req.session.user = user
    

    if(typeof(user) === 'string'){
        res.status(400), res.send('Invalid Credentials')
    } else{
        res.json(user)
    }
})

//router function to get all the users as a Financial Manager
user.get('', async (req, res)=>{
    if(!req.session.user){
        res.status(401), res.send('The incoming token has expired')
    }else{
     let user = req.session.user.roles
     if(user !== 3){
        res.status(401), res.send('The incoming token has expired')
    } else{
        let alluser = await getAllUsersService()
        res.json(alluser)
    }
}
})

//router function to get the user by id as a Finance Manager
user.get('/:id', async (req, res) =>{
    let id = +req.params.id
    if(!req.session.user){
        res.status(401), res.send('The incoming token has expired')
    }
    else{
     let role = req.session.user.roles
        if(role !== 3){
            res.status(401), res.send('The incoming token has expired')
        }
        else{
            if(isNaN(id)){
                res.sendStatus(400)
            }else {
                let user = await getAllUsersbyidserv(id)
                    if(user){
                        res.json(user)
                    } else {
                    res.sendStatus(400)
                    }
            }
        }
    }
})

//router function to update a user's information as a Finance Manager or Admin
user.patch('', async (req, res)=>{
    if(!req.session.user){
        res.status(401), res.send('The incoming token has expired')
    }else{  
        let uroles = req.session.user.roles
         if(uroles !== 3 && uroles !== 2){
            res.status(401), res.send('The incoming token has expired (Who the hell do you think you are!!!)')
        }else {

            const {user_id, username, password, firstname, lastname, email, roles} = req.body
            let user = await updateuserserv(req, user_id, username, password, firstname, lastname, email, roles)
                res.json(user)
            
        }
    }    

})