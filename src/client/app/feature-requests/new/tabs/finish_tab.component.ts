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
import {Component, Input, EventEmitter, Output} from '@angular/core';
import {FeatureRequest,TimeStampHelper} from '../../../shared/index';

/**
 * FinishTabComponent.
 * Used by new feature request component.
 * Shows a summary of the new feature requests.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-fr-finish',
  templateUrl: 'finish_tab.component.html',
  styleUrls: ['finish_tab.component.css']
})
export class FinishTabComponent {
  /**
   * The feature request that will be sent to the server.
   */
  @Input() details: FeatureRequest;

  /**
   * The details changed event emitter, used for bidirectional binding.
   */
  @Output() detailsChange: EventEmitter<FeatureRequest> = new EventEmitter<FeatureRequest>();

  /**
   * Event emitter that emits the submit event.
   */
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();

  /**
   * On previous event emitter, is emitted when the previous button is clicked.
   */
  @Output() onPrevious: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Submit the new feature request.
   */
  submit() {
    this.details.target_date = new TimeStampHelper().ISODateString(new Date(this.details.target_date));
    this.onSubmit.emit();
  }

  /**
   * Go to the previouse tab.
   */
  previous() {
    this.onPrevious.emit();
  }
}
