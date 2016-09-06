import { Route } from '@angular/router';
import { FeatureRequestsComponent } from './index';
import {NewFeatureRequestComponent} from "./new/new_feature_request.component";
import {ClientsResolver, ProductAreasResolver, FeatureRequestsResolver} from "./resolver/index";

export const FeatureRequestsRoutes: Route[] = [
  {
    path: '',
    component: FeatureRequestsComponent,
    resolve:{
      featureRequests:FeatureRequestsResolver,
      productAreas: ProductAreasResolver
    }
  },
  {
    path: 'new',
    component: NewFeatureRequestComponent,
    resolve:{
      clients:ClientsResolver,
      productAreas: ProductAreasResolver
    }
  }
];
