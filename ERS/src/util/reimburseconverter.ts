import { Reimburse } from "../models/reimbursment";


export function sqlreimbursement(sqlreimbursement):Reimburse {
    
    
    let reim = new Reimburse(sqlreimbursement.reimbursementId, sqlreimbursement.author, sqlreimbursement.amount, sqlreimbursement.datesubmitted, sqlreimbursement.dateresolved, sqlreimbursement.description, sqlreimbursement.resolver, sqlreimbursement.status, sqlreimbursement.reimbursementtype)
    return reim
}