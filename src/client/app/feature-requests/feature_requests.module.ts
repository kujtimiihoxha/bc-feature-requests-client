import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeatureRequestsComponent } from './feature_requests.component';
import {NewFeatureRequestComponent} from "./new/new_feature_request.component";
import {ClientsResolver} from "./resolver/clients.resolver";
import {HeaderComponent} from "./new/header.component";
import {DetailsTabComponent} from "./new/tabs/details_tab.component";
import {ClientsTabComponent} from "./new/tabs/clients_tab.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [FeatureRequestsComponent,NewFeatureRequestComponent,HeaderComponent,DetailsTabComponent,ClientsTabComponent],
  exports: [FeatureRequestsComponent,NewFeatureRequestComponent],
  providers: [ClientsResolver]
})
export class FeatureRequestsModule { }
