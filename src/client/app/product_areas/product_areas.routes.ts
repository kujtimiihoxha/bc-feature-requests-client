import {Route} from '@angular/router';
import {ProductAreasComponent} from './index';
import {ProductAreasResolver} from "./resolver/product_areas.resolver";
import {NewProductAreaComponent} from "./new/new_product_area.component";
// import {LoginGuard} from '../shared/guard/login.guard';

export const ProductAreasRoutes: Route[] = [
  {
    path: '',
    component:ProductAreasComponent,
    resolve:{
      productAreas:ProductAreasResolver
    }
  },{
    path: 'new',
    component:NewProductAreaComponent,
  }
];
