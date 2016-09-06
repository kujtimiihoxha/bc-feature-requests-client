/**
 * Created by refresh on 9/5/16.
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {ProductArea,ProductAreaService} from "../../shared/index";

@Injectable()
export class ProductAreasResolver implements Resolve<ProductArea[]> {
  constructor(
    private productAreaService: ProductAreaService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductArea[]> {
    return this.productAreaService.get()
  }
}
