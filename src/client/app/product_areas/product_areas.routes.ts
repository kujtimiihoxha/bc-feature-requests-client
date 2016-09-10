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
import {Route} from '@angular/router';
import {AdminGuard} from "../shared/index";
import {
  ProductAreasComponent,
  ProductAreasResolver,
  NewProductAreaComponent
} from './index';
/**
 * ProductAreasRoutes.
 * Declared product area routes
 *
 *     => /bc/product-areas - display product areas
 * new => /bc/product-areas/new - create a new product area/
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
export const ProductAreasRoutes: Route[] = [
  {
    path: '',
    component:ProductAreasComponent,
    resolve:{
      productAreas:ProductAreasResolver
    }
  },{
    path: 'new',
    component:NewProductAreaComponent,
    canActivate:[AdminGuard]
  }
];
