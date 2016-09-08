import {Component, Input, EventEmitter, Output} from '@angular/core';
import {FeatureRequest, ProductArea} from '../../../shared/index';
/**
 * Created by refresh on 9/5/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-fr-details',
  templateUrl: 'details_tab.component.html',
  styleUrls: ['details_tab.component.css']
})
export class DetailsTabComponent {
  @Input() details: FeatureRequest;
  @Input() productAreas: ProductArea[];
  @Output() detailsChange: EventEmitter<FeatureRequest> = new EventEmitter<FeatureRequest>();
  @Output() onNext: EventEmitter<void> = new EventEmitter<void>();
  mindate = Date.now();
  selectedProductArea: string;

  next() {
    this.productAreas.forEach((p: ProductArea)=> {
      if (p.id === this.selectedProductArea) {
        this.details.product_area_id = p.id;
        this.details.product_area_name = p.name;
      }
    });
    this.onNext.emit();
  }

  descriptionChanged(a:string) {
    this.details.description = a;
  }
}
