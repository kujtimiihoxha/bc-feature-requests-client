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
import {Component, OnInit, EventEmitter} from '@angular/core';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import {ProductAreaService} from '../shared/resource/product_area.service';
import {BreadcrumbService} from '../shared/breadcrumb/breadcrumb.service';
import {LoadingService} from '../shared/loading/loading.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {ProductArea} from '../shared/model/product_area.model';
declare const Materialize: any;

/**
 * ProductAreasComponent.
 * Used to display the table  of product areas.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-product-areas',
  templateUrl: 'product_areas.component.html',
})
export class ProductAreasComponent implements OnInit {
  /**
   * Table data, product areas received from the server.
   */
  productAreas: ProductArea[]

  /**
   * Current product area selected.
   * Used from edit,delete modal.
   */
  currentProductArea: ProductArea

  /**
   * Event emitter used to show,hide edit modal
   */
  editModal: EventEmitter<string> = new EventEmitter<string>()

  /**
   * Event emitter used to show,hide delete modal
   */
  deleteModal: EventEmitter<string> = new EventEmitter<string>()
  /**
   * User role.
   */
  role: number;

  /**
   * Constructor that injects necessary injectable classes.
   * Gets the user role.
   *
   * @param breadcrumb used to update the breadcrumb of the header.
   * @param loading used to display loading during transaction.
   * @param productAreaService used to send edited,deleted client to the server.
   * @param route used to get the data from the resolver.
   */
  constructor(private breadcrumb: BreadcrumbService,
              private loading: LoadingService,
              private productAreaService: ProductAreaService,
              private route: ActivatedRoute) {
    this.role = new JwtHelper().decodeToken(localStorage.getItem('id_token')).role;
  }

  /**
   * Initiates the table data, updates breadcrumb.
   */
  ngOnInit(): void {
    this.breadcrumb.items = ['Product areas'];
    this.productAreas = this.route.snapshot.data['productAreas'];
  }


  /**
   * Open edit modal.
   * Set the current product area based on the id received,
   *  emit the openModal event.
   * @param id current product area id.
   */
  openEditModal(id: string) {
    for (var i = 0; i < this.productAreas.length; i++) {
      if (this.productAreas[i].id === id) {
        this.currentProductArea = new ProductArea();
        this.currentProductArea.id = this.productAreas[i].id;
        this.currentProductArea.name = this.productAreas[i].name;
        this.currentProductArea.description = this.productAreas[i].description;
        break;
      }
    }
    this.editModal.emit('openModal')
  }

  /**
   * Open delete modal.
   * Set the current product area based on the id received,
   *  emit the openModal event.
   * @param id current product area id
   */
  openDeleteModal(id: string) {
    for (var i = 0; i < this.productAreas.length; i++) {
      if (this.productAreas[i].id === id) {
        this.currentProductArea = new ProductArea();
        this.currentProductArea.id = this.productAreas[i].id;
        this.currentProductArea.name = this.productAreas[i].name;
        this.currentProductArea.description = this.productAreas[i].description;
        break;
      }
    }
    this.deleteModal.emit('openModal')
  }

  /**
   * Close delete modal without any change.
   */
  closeDeleteModal() {
    this.deleteModal.emit('closeModal')
  }

  /**
   * Close edit modal without any change.
   */
  closeEditModal() {
    this.editModal.emit('closeModal')
  }

  /**
   * Sends the deleted product id to the server.
   * Success:
   *      Remove product area from table.
   *      Close modal.
   * Error:
   *      Display error message.
   *      Close modal.
   */
  confirmDeleteProductArea() {
    this.loading.on();
    this.productAreaService.delete(this.currentProductArea.id).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      this.deleteModal.emit('closeModal')
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe(()=> {
      for (var i = 0; i < this.productAreas.length; i++) {
        var clientToDelete = new ProductArea()
        if (this.productAreas[i].id === this.currentProductArea.id) {
          clientToDelete = this.productAreas[i]
          break;
        }
      }
      this.productAreas.splice(this.productAreas.indexOf(clientToDelete), 1)
      this.editModal.emit('closeModal')
      this.loading.off();
      Materialize.toast('Delete Successful', 2000);
    });
  }


  /**
   * Sends the edited product area to the server.
   * Success:
   *      Update product area in table.
   *      Close modal.
   * Error:
   *      Display error message.
   *      Close modal.
   */
  editProductArea() {
    this.loading.on();
    this.productAreaService.put(this.currentProductArea.id, this.currentProductArea).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      this.editModal.emit('closeModal')
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe((response: ProductArea)=> {
      for (var i = 0; i < this.productAreas.length; i++) {
        if (this.productAreas[i].id === this.currentProductArea.id) {
          this.productAreas[i].name = response.name;
          this.productAreas[i].description = response.description;
          this.currentProductArea = null;
          break;
        }
      }
      this.editModal.emit('closeModal')
      this.loading.off();
      Materialize.toast('Update Successful', 2000);
    });
  }
}
