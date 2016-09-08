/**
 * Created by refresh on 9/5/16.
 */

import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {User, UserService} from '../../shared/index';

@Injectable()
export class UsersResolver implements Resolve<User[]> {
  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.get();
  }
}
