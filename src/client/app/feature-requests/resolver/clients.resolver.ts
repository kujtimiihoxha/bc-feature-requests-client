/**
 * Created by refresh on 9/5/16.
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {Client,ClientService} from "../../shared/index";

@Injectable()
export class ClientsResolver implements Resolve<Client[]> {
  constructor(
    private clientService: ClientService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Client[]> {
    return this.clientService.get()
  }
}
