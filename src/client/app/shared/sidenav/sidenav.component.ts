import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import {DemoHelper} from '../index'
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
})

export class SideNavComponent {
  jwtHelper: JwtHelper = new JwtHelper();
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: number;
  /**
   * Only for demo purpose.
   */
  demo:DemoHelper = new DemoHelper();
  constructor(private router: Router) {
    this.firstName = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).firstname;
    this.lastName = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).lastname;
    this.email = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).email;
    this.username = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).username;
    this.role = this.jwtHelper.decodeToken(localStorage.getItem('id_token')).role;

  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }

  /**
   * Only for demo purpose
   * @param username the user username
   * @returns {boolean} if it is a demo user.
   */
  isDemoUser(username:string){
    return this.demo.isDemoUser(username);
  }
}
