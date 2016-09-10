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
 * TimeStampHelper.
 * Returns a ISO date sting.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
export class TimeStampHelper {
  ISODateString(d: Date) {
    return d.getUTCFullYear() + '-'
      + this.pad(d.getUTCMonth() + 1) + '-'
      + this.pad(d.getUTCDate()) + 'T'
      + this.pad(d.getUTCHours()) + ':'
      + this.pad(d.getUTCMinutes()) + ':'
      + this.pad(d.getUTCSeconds()) + 'Z';
  }

  private pad(n: number) {
    return n < 10 ? '0' + n : n;
  }

}

