/**
 * Copyright [2016] [Kujtim Hoxha]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {BaseModel} from './base.model';

/**
 * FeatureRequest model.
 *
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
export class FeatureRequest extends BaseModel {
  title: string;
  description: string;
  target_date: string;
  ticket_url: string;
  closed: boolean;
  product_area_id: string;
  product_area_name: string;
  clients: {
    name: string,
    client_id: string,
    priority: number,
  }[];
  modifications:{
    user_id: string,
    description: string,
    type: string,
    icon: string,
    created_at: string,
  };
  comments:{
    user_id: string,
    comment: string
  };
}

/**
 * FeatureRequest update model.
 *
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
export class FeatureRequestUpdateDetails {
  title: string;
  description: string;
  ticket_url: string;
  product_area_id: string;
  modifications: string[];
}

/**
 * MODIFICATIONS.
 * Possible modifications.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
export class MODIFICATIONS {
  static TITLE_UPDATE = 'title_update';
  static DESCRIPTION_UPDATE = 'description_update';
  static PRODUCT_ARE_UPDATE = 'product_are_update';
  static TICKET_URL_UPDATE = 'ticket_url_update';
}
