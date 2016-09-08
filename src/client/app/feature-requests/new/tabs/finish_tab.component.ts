import {Component, Input, EventEmitter, Output} from '@angular/core';
import {FeatureRequest} from '../../../shared/model/feature_request.model';
import {TimestempHelper} from '../../../shared/helpers/timestemp.helper';
/**
 * Created by refresh on 9/5/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-fr-finish',
  templateUrl: 'finish_tab.component.html',
  styleUrls: ['finish_tab.component.css']
})
export class FinishTabComponent {
  @Input() details: FeatureRequest;
  @Output() detailsChange: EventEmitter<FeatureRequest> = new EventEmitter<FeatureRequest>();
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();
  @Output() onPrevious: EventEmitter<void> = new EventEmitter<void>();

  submit() {
    this.details.target_date = new TimestempHelper().ISODateString(new Date(this.details.target_date));
    this.onSubmit.emit();
  }

  previous() {
    this.onPrevious.emit();
  }
}
