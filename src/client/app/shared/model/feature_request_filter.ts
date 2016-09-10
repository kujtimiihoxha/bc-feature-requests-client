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
 * FeatureRequestFilter update model.
 *
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
export class FeatureRequestFilter {
  employ: string;
  client: string;
  closed: number;
  product_area: string;
  priority_dir: string;
  field: string;
  dir: string;
  skip: number;
  get: number;
  [key: string]: any;

  static getDefaultFilter() {
    let df = new FeatureRequestFilter();
    df.get = 5;
    df.priority_dir = 'desc';
    df.field = 'created_at';
    df.dir = 'desc';
    return df;
  }
}
