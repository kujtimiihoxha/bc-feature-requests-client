import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeatureRequestsComponent } from './feature_requests.component';
import { NameListService, BreadcrumbService} from '../shared/index';
import {NewFeatureRequestComponent} from "./new/new_feature_request.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [FeatureRequestsComponent,NewFeatureRequestComponent],
  exports: [FeatureRequestsComponent,NewFeatureRequestComponent],
  providers: [NameListService,BreadcrumbService]
})
export class FeatureRequestsModule { }
