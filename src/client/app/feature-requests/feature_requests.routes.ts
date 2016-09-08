import {Route} from '@angular/router';
import {FeatureRequestsComponent} from './index';
import {NewFeatureRequestComponent} from './new/new_feature_request.component';
import {ClientsResolver, ProductAreasResolver, FeatureRequestsResolver} from './resolver/index';
import {UsersResolver} from './resolver/users.resolver';
import {FeatureRequestDetailsComponent} from './details/feature_request_details.component';
import {FeatureRequestResolver} from './resolver/feature_request.resolver';

export const FeatureRequestsRoutes: Route[] = [
  {
    path: '',
    component: FeatureRequestsComponent,
    resolve: {
      users: UsersResolver,
      clients: ClientsResolver,
      featureRequests: FeatureRequestsResolver,
      productAreas: ProductAreasResolver
    }
  },
  {
    path: 'new',
    component: NewFeatureRequestComponent,
    resolve: {
      clients: ClientsResolver,
      productAreas: ProductAreasResolver
    }
  },
  {
    path: 'details/:id',
    component: FeatureRequestDetailsComponent,
    resolve: {
      users: UsersResolver,
      clients: ClientsResolver,
      productAreas: ProductAreasResolver,
      featureRequest: FeatureRequestResolver
    }
  }
];
