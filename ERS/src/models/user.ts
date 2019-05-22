//import { Role } from "./role";

export class Users {
    user_id: number  // primary key
      username: string // not null, unique
      password: string  // not null
      firstname: string  // not null
      lastname: string  // not null
      email: string  // not null
      roles: number // not null

      constructor(username:string = '', user_pass:string = '', firstname:string = '', lastname:string ='', email:string = '', roles:number, user_id?:number){
        this.user_id = user_id
        this.username = username
        this.password = user_pass
        this.email = email
        this.firstname = firstname
        this.lastname = lastname
        this.roles = roles
    }
  }

