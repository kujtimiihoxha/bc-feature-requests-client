import {Injectable} from "@angular/core";
import {User} from "./user.model";
import {JwtHelper,tokenNotExpired} from "angular2-jwt/angular2-jwt";
@Injectable()
export class AuthService {
  private currentUser : User
  init(){
      if (typeof this.currentUser !== 'undefined') {
        return;
      }
      if(this.isNotExpired()){
        let usr = new JwtHelper().decodeToken(localStorage.getItem("id_token"));
        this.currentUser = new User();
        this.currentUser.email = usr.email;
        this.currentUser.firstname = usr.firstname;
        this.currentUser.lastname = usr.lastname;
        this.currentUser.username = usr.username;
        this.currentUser.clientId = usr.clientId;
        this.currentUser.clientname = usr.clientname;
        this.currentUser.role = usr.role;
        this.currentUser.id = usr.id;
      }
  }

  user():User{
    return this.currentUser
  }
  reset(){
    this.currentUser = undefined;
  }
  isNotExpired(){
    return tokenNotExpired()
  }
}
