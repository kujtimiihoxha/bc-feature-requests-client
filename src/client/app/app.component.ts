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
import {Component} from '@angular/core';
import {LoadingService} from './shared/index';
import {Router, NavigationStart, NavigationEnd} from '@angular/router';
declare const $: any;
/**
 *
 * This class represents the main application component.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  /**
   * Injects loading service and route servie.
   * @param loadingService used to display loaing.
   * @param router used to subscribe to route changes.
   */
  constructor(private loadingService: LoadingService,router: Router) {
    router.events.subscribe((event:any) => {
      if(event instanceof NavigationStart) {
        loadingService.on();
      } else if(event instanceof NavigationEnd) {
        loadingService.off();
        if(typeof $('#sidenav-overlay') !== 'undefined') {
          $('#sidenav-overlay').remove();
        }
      }
    });
  }
}
