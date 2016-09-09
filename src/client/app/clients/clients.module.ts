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
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ClientsComponent} from './index';
import {ClientsResolver} from "./resolver/clients.resolver";
import {NewClientComponent} from "./new/new_client.component";
/**
 * ClientsModule.
 * Declares and Exports the ClientsComponent and NewClientComponent
 * Provides the ClientsResolver.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/9/2016
 **/
@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ClientsComponent, NewClientComponent],
  exports: [ClientsComponent, NewClientComponent],
  providers:[ClientsResolver]
})
export class ClientModule {}
