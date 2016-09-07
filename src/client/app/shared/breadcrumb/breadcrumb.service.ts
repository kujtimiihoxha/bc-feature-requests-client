/**
 * Created by refresh on 9/1/16.
 */

import {Injectable} from "@angular/core";
@Injectable()
export class BreadcrumbService {
  items: string[]

  constructor() {
    this.items = []
  }

  setItems(its: string[]) {
    this.items = its
  }
}
