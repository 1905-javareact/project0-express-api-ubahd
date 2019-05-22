import { UserDTO } from "../dtos/userdtos";
import { Users } from "../models/user";

export function sqlUsertojsUSer(sqluser:UserDTO):Users{
    return new Users(sqluser.username, sqluser.pass_word, sqluser.firstname, sqluser.lastname, sqluser.email, sqluser.roles, sqluser.user_id)
}

