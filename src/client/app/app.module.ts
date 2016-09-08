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

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes), FeatureRequestsModule, LoginModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule {
}
