/**
 * Copyright [2016] [Kujtim Hoxha]
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {ProductArea, BreadcrumbService, LoadingService, ProductAreaService} from '../../shared/index';
declare const Materialize: any;
/**
 * NewProductAreaComponent.
 * Used to create a new product area
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-new-product-area',
  templateUrl: 'new_product_area.component.html',
  styleUrls: ['new_product_area.component.css'],
})
export class NewProductAreaComponent implements OnInit {
  /**
   * The new product area data.
   */
  productArea: ProductArea;

  /**
   * Constructor that injects the necessary injectable classes.
   * @param router used to navigate to product areas list after successful insert.
   * @param breadcrumb used to update the header breadcrumb
   * @param loading used to display loading.
   * @param productAreaService used to send the request.
   */
  constructor(private router: Router,
              private breadcrumb: BreadcrumbService,
              private loading: LoadingService,
              private productAreaService: ProductAreaService) {
  }

  /**
   * Initializes product area.
   * Upates th breadcrumb.
   */
  ngOnInit(): void {
    this.breadcrumb.items = ['Product areas', 'Create'];
    this.productArea = new ProductArea();
  }

  /**
   * Submit the new produlct area.
   */
  submit() {
    this.loading.on();
    this.productAreaService.post(this.productArea).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe(()=> {
      this.loading.off();
      this.router.navigate(['/bc/product-areas']);
      //noinspection TypeScriptUnresolvedFunction
      Materialize.toast('Create Successful', 2000);
    });
  }

}
