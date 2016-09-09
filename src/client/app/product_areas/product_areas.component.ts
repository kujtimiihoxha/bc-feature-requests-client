import {Component, OnInit, EventEmitter} from "@angular/core";
import {ProductAreaService} from "../shared/resource/product_area.service";
import {BreadcrumbService} from "../shared/breadcrumb/breadcrumb.service";
import {LoadingService} from "../shared/loading/loading.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {ProductArea} from "../shared/model/product_area.model";
declare const Materialize:any;
/**
 * Created by kujtim on 9/9/2016.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-product-areas',
  templateUrl: 'product_areas.component.html',
  styleUrls: ['product_areas.component.css'],
})
export class ProductAreasComponent  implements OnInit{
  productAreas:ProductArea[]
  currentProductArea:ProductArea
  editModal:EventEmitter<string>= new EventEmitter<string>()
  deleteModal:EventEmitter<string>= new EventEmitter<string>()
  constructor(
    private breadcrumb: BreadcrumbService,
    private loading: LoadingService,
    private clientService: ProductAreaService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.breadcrumb.items = ['Product areas'];
    this.productAreas = this.route.snapshot.data['productAreas'];
  }
  openEditModal(id:string){
    for(var i = 0;i<this.productAreas.length; i++){
      if ( this.productAreas[i].id === id) {
        this.currentProductArea = new ProductArea();
        this.currentProductArea.id = this.productAreas[i].id;
        this.currentProductArea.name = this.productAreas[i].name;
        this.currentProductArea.description = this.productAreas[i].description;
        break;
      }
    }
    this.editModal.emit("openModal")
  }
  openDeleteModal(id:string){
    for(var i = 0;i<this.productAreas.length; i++){
      if ( this.productAreas[i].id === id) {
        this.currentProductArea = new ProductArea();
        this.currentProductArea.id = this.productAreas[i].id;
        this.currentProductArea.name = this.productAreas[i].name;
        this.currentProductArea.description = this.productAreas[i].description;
        break;
      }
    }
    this.deleteModal.emit("openModal")
  }
  closeDeleteModal(){
    this.deleteModal.emit("closeModal")
  }
  closeEditModal(){
    this.editModal.emit("closeModal")
  }
  confirmDeleteProductArea(){
    this.loading.on();
    this.clientService.delete(this.currentProductArea.id).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      this.deleteModal.emit("closeModal")
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe(()=> {
      for(var i = 0;i<this.productAreas.length; i++){
        var clientToDelete = new ProductArea()
        if ( this.productAreas[i].id === this.currentProductArea.id) {
          clientToDelete = this.productAreas[i]
          break;
        }
      }
      this.productAreas.splice(this.productAreas.indexOf(clientToDelete),1)
      this.editModal.emit("closeModal")
      this.loading.off();
      Materialize.toast("Delete Successful", 2000);
    });
  }
  editProductArea(){
    this.loading.on();
    this.clientService.put(this.currentProductArea.id,this.currentProductArea).catch((error: any)=> {
      this.loading.off();
      //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedVariable
      this.editModal.emit("closeModal")
      Materialize.toast(JSON.parse(error._body).message, 2000);
      return Observable.empty();
    }).subscribe((response: ProductArea)=> {
      for(var i = 0;i<this.productAreas.length; i++){
        if ( this.productAreas[i].id === this.currentProductArea.id) {
          this.productAreas[i].name = response.name;
          this.productAreas[i].description = response.description;
          this.currentProductArea = null;
          break;
        }
      }
      this.editModal.emit("closeModal")
      this.loading.off();
      Materialize.toast("Update Successful", 2000);
    });
  }

}
