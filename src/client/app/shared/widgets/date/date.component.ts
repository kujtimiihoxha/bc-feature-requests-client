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
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DateHelper} from '../../helpers/date.helper';
declare const $:any;

/**
 * DateComponent.
 * Widget used to display target date.
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/8/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-date-widget',
  templateUrl: 'date.component.html',
})
export class DateComponent {
  /**
   * The date object.
   * It is created from {@link #date} input.
   */
  theDate: Date;
  /**
   * Local updated date
   */
  update_date: string;
  /**
   * Minum date allowed is now because targed can not be befor now.
   */
  mindate:number = Date.now();

  /**
   * Event emitter used by the modal to close it.
   */
  modalActions:EventEmitter<string> = new EventEmitter<string>();

  /**
   * Emits the new date selected.
   */
  @Output() dateChanged:EventEmitter<Date> = new EventEmitter<Date>();

  /**
   * Tells if the edit button should be displayed.
   */
  @Input() edit: boolean;

  /**
   * These are used to display the date.
   */
  year: number;
  month: string;
  dayDate: number;
  day: string;

  /**
   * Input date that should be displayed.
   * @param val the value.
   */
  @Input()
  set date(val: string) {
    this.theDate = new Date(val);
    this.month = DateHelper.MONTHS[this.theDate.getMonth()];
    this.year = this.theDate.getFullYear();
    this.dayDate = this.theDate.getDate();
    this.day = DateHelper.DAYS[this.theDate.getDay()];
    this.update_date = `${this.dayDate} ${DateHelper.MONTHS_LONG[this.theDate.getMonth()]}, ${this.year}`;
  }

  /**
   * Closes modal.
   */
  closeModal() {
    this.modalActions.emit('closeModal');
  }

  /**
   * Save the new date.
   */
  save() {
    if(new Date(this.update_date) !== this.theDate) {
      this.dateChanged.emit(new Date(this.update_date));
    }
    this.modalActions.emit('closeModal');
  }


}
