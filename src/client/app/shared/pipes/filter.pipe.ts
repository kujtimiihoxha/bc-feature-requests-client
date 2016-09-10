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
import {Pipe, PipeTransform} from '@angular/core';

/**
 * FilterPipe.
 * Filter array by property name and value, case insensitive.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length === 0) {
      return value;
    }
    let resultArray: any = [];
    for (let item of value) {
      if (typeof args[1] !== 'undefined') {
        args[1] = args[1].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      }
      if (item[args[0]].match(new RegExp('^.*(' + args[1] + ').*$', 'ig'))) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
