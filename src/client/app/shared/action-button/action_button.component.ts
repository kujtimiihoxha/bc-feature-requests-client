import {Component} from "@angular/core";
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import {Router} from "@angular/router";
/**
 * Created by refresh on 9/1/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-action-button',
  templateUrl: 'action_button.component.html',
})
export class ActionButton {
  role: number
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) {
    this.role = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).role;
  }

  newFeatureRequest() {
    this.router.navigate(['/bc/feature-requests/new'])
  }
}
