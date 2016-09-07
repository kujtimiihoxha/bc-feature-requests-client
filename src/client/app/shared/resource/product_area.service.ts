/**
 * Created by refresh on 9/5/16.
 */
/**
 * Created by refresh on 9/1/16.
 */
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {BaseResource} from "./base.service";
import {ProductArea} from "../model/index";
@Injectable()
export class ProductAreaService extends BaseResource<ProductArea> {
  constructor(protected http: Http) {
    super(http, 'product-areas')
  }
}
