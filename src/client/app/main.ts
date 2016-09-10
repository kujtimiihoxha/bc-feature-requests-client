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
 * Bootstraps the application and makes the ROUTER_PROVIDERS and the APP_BASE_HREF available to it.
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

if (String('<%= ENV %>') === 'prod') {
  enableProdMode();
}

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);
