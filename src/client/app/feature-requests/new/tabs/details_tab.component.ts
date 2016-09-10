/**
 * Copyright [2016] [Kujtim Hoxha]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Component, Input, EventEmitter, Output} from '@angular/core';
import {FeatureRequest, ProductArea} from '../../../shared/index';
/**
 * DetailsTabComponent.
 * Used by new feature request component.
 * This component is used to set the new feature request details.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-fr-details',
  templateUrl: 'details_tab.component.html',
  styleUrls: ['details_tab.component.css']
})
export class DetailsTabComponent {
  /**
   * The feature request that will be sent to the server.
   */
  @Input() details: FeatureRequest;

  /**
   * The details changed event emitter, used for bidirectional binding.
   */
  @Output() detailsChange: EventEmitter<FeatureRequest> = new EventEmitter<FeatureRequest>();

  /**
   * The feature request Product areas
   */
  @Input() productAreas: ProductArea[];

  /**
   * On next event emitter, is emitted when the next button is clicked.
   */
  @Output() onNext: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Minimum target date (today).
   *
   */
  minDate:number = Date.now();

  /**
   * The selected product area.
   */
  selectedProductArea: string;

  /**
   * Go to next page.
   */
  next() {
    this.productAreas.forEach((p: ProductArea)=> {
      if (p.id === this.selectedProductArea) {
        this.details.product_area_id = p.id;
        this.details.product_area_name = p.name;
      }
    });
    this.onNext.emit();
  }

  /**
   * Save the description to the feature request.
   * @param value new description value.
   */
  descriptionChanged(value:string) {
    this.details.description = value;
  }
}
