import {Component, Input, EventEmitter, Output} from "@angular/core";
import {FeatureRequestModel} from "../../../shared/model/feature_request.model";
/**
 * Created by refresh on 9/5/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-fr-details',
  templateUrl: 'details_tab.component.html',
  styleUrls: ["details_tab.component.css"]
})
export class DetailsTabComponent {
  @Input() details: FeatureRequestModel ;
  @Output() detailsChange: EventEmitter<FeatureRequestModel> = new EventEmitter<FeatureRequestModel>();
  @Output() onNext: EventEmitter<void> = new EventEmitter<void>();
  mindate = Date.now();
  next(){
    this.onNext.emit()
  }
}
