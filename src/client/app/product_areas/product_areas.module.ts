import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ProductAreasComponent} from './index';
import {ProductAreasResolver} from "./resolver/product_areas.resolver";
import {NewProductAreaComponent} from "./new/new_product_area.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ProductAreasComponent, NewProductAreaComponent],
  exports: [ProductAreasComponent, NewProductAreaComponent],
  providers:[ProductAreasResolver]
})
export class ProductAreaModule {

}
