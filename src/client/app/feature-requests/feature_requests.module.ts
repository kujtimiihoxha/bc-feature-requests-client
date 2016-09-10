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
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {
  FeatureRequestsComponent,
  FeatureRequestDetailsComponent,
  FeatureRequestsTableComponent,
  FeatureRequestsFilterComponent,
  DetailsTabComponent,
  ClientsTabComponent,
  FinishTabComponent,
  ClientsResolver,
  ProductAreasResolver,
  FeatureRequestsResolver,
  FeatureRequestResolver,
  UsersResolver,
  HeaderComponent,
  NewFeatureRequestComponent

} from './index';
/**
 * FeatureRequestsModule.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    FeatureRequestsComponent,
    FeatureRequestsTableComponent,
    FeatureRequestsFilterComponent,
    NewFeatureRequestComponent,
    FeatureRequestDetailsComponent,
    HeaderComponent,
    DetailsTabComponent,
    ClientsTabComponent,
    FinishTabComponent
  ],
  exports: [FeatureRequestsComponent, NewFeatureRequestComponent],
  providers: [
    ClientsResolver,
    ProductAreasResolver,
    FeatureRequestsResolver,
    UsersResolver,
    FeatureRequestResolver
  ]
})
export class FeatureRequestsModule {}
