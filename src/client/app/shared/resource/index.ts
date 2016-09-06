/**
 * Created by refresh on 9/5/16.
 */
export * from './base.service'
export * from './client.service'
export * from './product_area.service'
export * from './feature_request.service'

import {ClientService} from "./client.service";
import {ProductAreaService} from "./product_area.service";
import {FeatureRequestService} from "./feature_request.service";

export const RESOURCE_SERVICES = [
  ClientService,
  ProductAreaService,
  FeatureRequestService
]
