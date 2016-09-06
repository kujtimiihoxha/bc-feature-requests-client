import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeatureRequestsComponent } from './feature_requests.component';
import {ClientsResolver, ProductAreasResolver, FeatureRequestsResolver} from "./resolver/index";
import {
  HeaderComponent,
  NewFeatureRequestComponent,
  DetailsTabComponent,
  ClientsTabComponent,
  FinishTabComponent
} from "./new/index";
import {MomentModule} from "angular2-moment";

@NgModule({
  imports: [CommonModule, SharedModule,MomentModule],
  declarations: [FeatureRequestsComponent,NewFeatureRequestComponent,HeaderComponent,DetailsTabComponent,ClientsTabComponent,FinishTabComponent],
  exports: [FeatureRequestsComponent,NewFeatureRequestComponent],
  providers: [ClientsResolver,ProductAreasResolver, FeatureRequestsResolver]
})
export class FeatureRequestsModule { }
