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
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {routes} from './app.routes';
import {SharedModule} from './shared/shared.module';
import {LoginModule} from './login/login.module';
import {FeatureRequestsModule} from './feature-requests/feature_requests.module';
import {VerifyModule} from "./verify/verify.module";
import {RegisterModule} from "./register/register.module";
import {ClientModule} from "./clients/clients.module";
import {ProductAreaModule} from "./product_areas/product_areas.module";
/**
 * AppModule.
 *
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FeatureRequestsModule,
    LoginModule,
    VerifyModule,
    ClientModule,
    ProductAreaModule,
    RegisterModule,
    SharedModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule {}
