import express from 'express'
import { sessionmiddleware } from './middleware/sessionmiddleware';
import bodyParser from 'body-parser'
import { reimburse } from './routers/reimbursementrouter';
import { user } from './routers/userrouters';


const app = express();

app.use(sessionmiddleware)

app.use(bodyParser.json())

app.use('/login', user)

app.use('/users', user)

app.use('/reimbursements/status', reimburse)

app.use('/reimbursements/author', reimburse)

app.use('/reimbursements', reimburse)

app.use('/reimbursements/users', reimburse)

app.listen(8050, ()=>{
    console.log('Application is running');  
})