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
/**
 * HeaderComponent.
 * Used by create feature request component
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bc-fr-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {

  /**
   * Current tab input.
   * Keeps track of the current tab.
   */
  @Input() currentTab: number;

  /**
   * Tab headers used to display the title of the tab.
   */
  headers: {[key: number]: string} = {
    1: 'Request Details',
    2: 'Select Clients',
    3: 'Submit'
  };

  /**
   * Tab help used to display the tab help text.
   */
  help: {[key: number]: string} = {
    1: '',
    2: 'Drag clients to the highlighted area',
    3: ''
  };

  /**
   * Get current tab header.
   */
  getHeader(): string {
    return this.headers[this.currentTab];
  }

  /**
   * Get the current tab help text.
   */
  getHelp(): string {
    return this.help[this.currentTab];
  }

  /**
   * Is tab disabled
   * @param tab the tab.
   */
  isDisabled(tab: number) {
    return {
      'disabled': this.currentTab !== tab
    };
  }

  /**
   * Is tab active
   * @param tab tab.
   */
  getClass(tab: number) {
    return {
      'active': this.currentTab === tab
    };
  }
}
