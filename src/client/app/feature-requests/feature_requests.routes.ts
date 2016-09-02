import { Route } from '@angular/router';
import { FeatureRequestsComponent } from './index';
import {NewFeatureRequestComponent} from "./new/new_feature_request.component";

export const FeatureRequestsRoutes: Route[] = [
  {
    path: '',
    component: FeatureRequestsComponent
  },
  {
    path: 'new',
    component: NewFeatureRequestComponent
  }
];
