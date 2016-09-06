import {Component, OnInit, EventEmitter, ViewChild, ElementRef, Renderer} from '@angular/core';
import { BreadcrumbService} from '../shared/index';
import {ActivatedRoute} from "@angular/router";
import {FeatureRequest} from "../shared/model/feature_request.model";
import {ProductArea} from "../shared/model/product_area.model";
import {LoadingService} from "../shared/loading/loading.service";
import {FeatureRequestService} from "../shared/resource/feature_request.service";
import {FeatureRequestFilter} from "../shared/model/feature_request_filter";
import {Observable} from "rxjs";
import {FilterResponse} from "../shared/model/filter_response.model";
import {Client} from "../shared/model/client.model";
import {JwtHelper} from "angular2-jwt";
import {User} from "../shared/model/user.model";
declare const  Materialize:any
declare const  $:any

/**
 * This class represents the lazy loaded FeatureRequestsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-feature-requests',
  templateUrl: 'feature_requests.component.html',
  styleUrls: ['feature_requests.component.css'],
})
export class FeatureRequestsComponent implements OnInit {
  // @ViewChild('clientDropdown') clientDp: ElementRef;
  // @ViewChild('employDropdown') employDp: ElementRef;
  // @ViewChild('productAreaD') input: ElementRef;

  total :number;
  featureRequests:FeatureRequest[]
  productAreas: ProductArea[ ]
  clients: Client[ ]
  users: User[ ]
  days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  filter = new FeatureRequestFilter().getDefaultFilter()
  employSearch = ""
  productAreaSearch = ""
  clientSearch = ""
  /**
   * Creates an instance of the FeatureRequestsComponent with the injected
   * BreadcrumbService.
   *
   * @param {BreadcrumbService} breadcrumb - The injected BreadcrumbService.
   */
  constructor(private renderer: Renderer,private breadcrumb:BreadcrumbService,private loading: LoadingService,private featureRequestService: FeatureRequestService,private route: ActivatedRoute) {}
  /**
   * Set the breadcrumb OnInit
   */
  ngOnInit() {
    this.breadcrumb.items=["Feature Requests"]
    this.featureRequests = this.route.snapshot.data["featureRequests"].data
    this.total = this.route.snapshot.data["featureRequests"].total
    this.productAreas = this.route.snapshot.data["productAreas"]
    this.clients = this.route.snapshot.data["clients"]
    this.users = this.route.snapshot.data["users"]
    $('.dropdown-content').on('click', (e:any) => {
      e.stopPropagation();
    });
  }
  getProductAreaName(id: string) {
    var productArea: ProductArea;
    this.productAreas.forEach((p: ProductArea)=>{
      if (p.id === id) {
        productArea = p
      }
    });
    return productArea.name
  }
  getClientName(id: string) {
    var client: Client;
    this.clients.forEach((c: Client)=>{
      if (c.id === id) {
        client = c
      }
    });
    return client.name
  }
  getDate(date: string) {
    let dt = new Date(date)
    let month = this.months[dt.getMonth()]
    let year = dt.getFullYear()
    let dayDate = dt.getDate()
    let day = this.days[dt.getDay()]
    return `${day} ${dayDate} ${month} ${year}`
  }
  isActive(state:number){
    if (this.filter.closed === state) {
        return {
          'active': true
        }
    }
    return {
      'active': false
    }
  }
  openFilter(){
    if (this.filter.closed == 2){
      this.filter.closed = 0
      this.sendFilterRequest()
      return
    }
    this.filter.closed = 2
    this.sendFilterRequest()
  }
  closedFilter(){
    if (this.filter.closed == 1){
      this.filter.closed = 0
      this.sendFilterRequest()
      return
    }
    this.filter.closed = 1
    this.sendFilterRequest()
  }
  sendFilterRequest(){
    this.loading.on()
    this.featureRequestService.getWithFilter(this.filter).catch((error:any)=>{
      this.loading.off()
      Materialize.toast(JSON.parse(error._body).message,2000)
      return Observable.empty()
    }).subscribe((response:FilterResponse<FeatureRequest>)=>{
      this.featureRequests = response.data
      this.total = response.total
      this.loading.off()
    });
  }
  openCount(){
    return this.featureRequests.filter((fr:FeatureRequest)=>{
      return !fr.closed
    }).length
  }
  closedCount(){
    return this.featureRequests.filter((fr:FeatureRequest)=>{
      return fr.closed
    }).length
  }


  //FILTER
  clearFilter(){
    this.filter = new FeatureRequestFilter().getDefaultFilter()
    this.sendFilterRequest()
  }
  filterByUser(id: string){
    this.filter.employ = id
    $('.filter-employ').dropdown('close')
    this.sendFilterRequest()
  }
  filterByClient(id: string){
    this.filter.client = id
    $('.filter-client').dropdown('close')
    this.sendFilterRequest()
  }
  showPriorityFilter(){
    if (this.filter.client != null){
      return{
        "display":"block"
      }
    }
    return {
      "display":"none"
    }
  }
  filterByProductArea(id: string){
    this.filter.product_area = id
    $('.filter-product-area').dropdown('close')
    this.sendFilterRequest()

  }
  filterClientPriority(dir: string){
    this.filter.priority_dir = dir
    this.filter.field = null
    this.filter.dir = null
    $('.filter-priority').dropdown('close')
    this.sendFilterRequest()
  }

  showFilterNav: boolean = false
  isFilterHidden(){
    if (this.showFilterNav){
      return {
        "display":"block"
      }
    }
    return {
      "display":"none"
    }
  }
  getFilterSummary(){
    let filterString = ""
    if (this.filter.employ != null) {
      this.users.forEach((user:User)=>{
         if(user.id == this.filter.employ){
           filterString+= "Employ:  <b>"+ user.username+ "</b>, "
         }
      })
    }
    if (this.filter.product_area != null) {
      filterString+= "Product Area: <b>"+ this.getProductAreaName(this.filter.product_area)+ "</b>, "
    }
    if (this.filter.client != null) {
      filterString+= "Client: <b>"+ this.getClientName(this.filter.client)+ "</b>, Priority: <b>" + this.filter.priority_dir+"</b>"
    }
    if (filterString != "") {
      return "Filter: " + filterString
    }
    return filterString
  }
  correctPositionDp(el: ElementRef){
   this.renderer.setElementStyle(el,'left','0')
  }
}
