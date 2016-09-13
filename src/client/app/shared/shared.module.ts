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
import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SideNavComponent} from './sidenav/index';
import {MaterializeDirective} from 'angular2-materialize';
import {BreadcrumbComponent, BreadcrumbService} from './breadcrumb/index';
import {LayoutComponent} from './layout/index';
import {AuthGuard, AdminGuard} from './guard/index';
import {ActionButtonComponent} from './action-button/index';
import {FilterPipe} from './pipes/filter.pipe';
import {RESOURCE_SERVICES} from './resource/index';
import {DateComponent} from './widgets/date/date.component';
import {LoadingService} from './loading/loading.service';
import {LoginGuard} from './guard/login.guard';
import {TinyEditorComponent} from './widgets/editor/tinymce.component';
import {AuthService} from './auth/index';
import {WebSocketService} from "./websocket/websocket.service";
import {NotificationsService} from "./notifications/notifications.service";
import {NotificationsComponent} from "./notifications/notifications.component";

/**
 * Shared module.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/2016
 **/
@NgModule({
  imports: [CommonModule, RouterModule, FormsModule],
  declarations: [
    MaterializeDirective,
    NotificationsComponent,
    SideNavComponent,
    BreadcrumbComponent,
    LayoutComponent,
    ActionButtonComponent,
    FilterPipe,
    DateComponent,
    TinyEditorComponent
  ],
  exports: [
    SideNavComponent,
    BreadcrumbComponent,
    LayoutComponent,
    TinyEditorComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    MaterializeDirective,
    FilterPipe,
    NotificationsComponent,
    DateComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        BreadcrumbService,
        LoadingService,
        AuthGuard,
        AdminGuard,
        LoginGuard,
        AuthService,
        WebSocketService,
        NotificationsService,
        ...RESOURCE_SERVICES
      ]
    };
  }
}
