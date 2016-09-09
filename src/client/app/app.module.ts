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

export class AppModule {
}
