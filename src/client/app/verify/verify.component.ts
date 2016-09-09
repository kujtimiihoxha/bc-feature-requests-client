import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VerifyService} from "./verify.service";
import {User} from "../shared/model/user.model";
import {Observable} from "rxjs/Rx";
declare const Materialize: any;
@Component({
  moduleId: module.id,
  selector: 'bc-verify',
  templateUrl: 'verify.component.html',
})
export class VerifyComponent implements OnInit{
  verified:boolean = false;
  id:string;
  firstname:string;
  errorMessage:string;
  error:boolean = false;
  constructor(private route: ActivatedRoute, private verifyService: VerifyService){

  }
  ngOnInit(){
    this.id = this.route.snapshot.params["id"]
    if (!this.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)){
      this.errorMessage = "The link provided is not valid."
      this.error = true;
    }
    this.verifyService.put(this.id,null).catch((error: any)=> {
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
      this.error = true;
      this.errorMessage = JSON.parse(error._body).message
      return Observable.empty();
    }).subscribe((response: User)=> {
      //noinspection TypeScriptUnresolvedVariable
      this.firstname = response.first_name;
      //noinspection TypeScriptUnresolvedFunction
      this.verified = true;
    });
  }
}
