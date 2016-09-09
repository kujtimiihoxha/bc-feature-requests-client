import {Component, OnInit} from "@angular/core";
import {ProductArea} from "../../shared/model/product_area.model";
import {BreadcrumbService} from "../../shared/breadcrumb/breadcrumb.service";
import {LoadingService} from "../../shared/loading/loading.service";
import {ProductAreaService} from "../../shared/resource/product_area.service";
import {Observable} from "rxjs/Rx";
import {Router} from "@angular/router";
declare const Materialize:any;
/**
 * Created by kujtim on 9/9/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-new-product-area',
  templateUrl: 'new_product_area.component.html',
  styleUrls: ['new_product_area.component.css'],
})
export class NewProductAreaComponent implements OnInit{

  productArea: ProductArea;
  constructor(
    private router: Router,
    private breadcrumb: BreadcrumbService,
    private loading: LoadingService,
    private productAreaService: ProductAreaService){}
  ngOnInit(): void {
    this.breadcrumb.items = ['Product areas','Create'];
    this.productArea = new ProductArea()
  }
    submit(){
      this.loading.on();
      this.productAreaService.post(this.productArea).catch((error: any)=> {
        this.loading.off();
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
        Materialize.toast(JSON.parse(error._body).message, 2000);
        return Observable.empty();
      }).subscribe(()=> {
        this.loading.off();
        this.router.navigate(['/bc/product-areas'])
        Materialize.toast("Create Successful", 2000);
      });
    }

}
