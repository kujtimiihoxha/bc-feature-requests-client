import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {FeatureRequestsComponent} from "./feature_requests.component";
import {ClientsResolver, ProductAreasResolver, FeatureRequestsResolver, FeatureRequestResolver} from "./resolver/index";
import {
  HeaderComponent,
  NewFeatureRequestComponent,
  DetailsTabComponent,
  ClientsTabComponent,
  FinishTabComponent
} from "./new/index";
import {UsersResolver} from "./resolver/users.resolver";
import {FeatureRequestDetailsComponent} from "./details/feature_request_details.component";
import {FeatureRequestsTableComponent} from "./feature_requests_table.component";
import {FeatureRequestsFilterComponent} from "./feature_requests_filter.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [FeatureRequestsComponent, FeatureRequestsTableComponent,FeatureRequestsFilterComponent,NewFeatureRequestComponent, FeatureRequestDetailsComponent, HeaderComponent, DetailsTabComponent, ClientsTabComponent, FinishTabComponent],
  exports: [FeatureRequestsComponent, NewFeatureRequestComponent],
  providers: [ClientsResolver, ProductAreasResolver, FeatureRequestsResolver, UsersResolver, FeatureRequestResolver]
})
export class FeatureRequestsModule {
}
