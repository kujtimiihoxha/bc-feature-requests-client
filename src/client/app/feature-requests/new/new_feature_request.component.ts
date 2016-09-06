import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Client, ProductArea, FeatureRequest, BreadcrumbService,FeatureRequestService} from "../../shared/index";
import {LoadingService} from "../../shared/loading/loading.service";
import {Observable} from "rxjs";
declare const  Materialize:any
/**
 * Created by refresh on 9/2/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-add-feature-request',
  templateUrl: 'new_feature_request.component.html',
  styleUrls: ['new_feature_request.component.css']
})
export class NewFeatureRequestComponent {
  currentTab = 1
  details = new FeatureRequest()
  clients: Array<Client> = [ ]
  productAreas: Array<ProductArea> = [ ]

  /**
   * Creates an instance of the FeatureRequestsComponent with the injected
   * BreadcrumbService.
   *
   */
  constructor(private breadcrumb: BreadcrumbService, private route: ActivatedRoute, private router: Router, private featureRequestService: FeatureRequestService, private loading: LoadingService) {
    this.details.clients = []
  }

  /**
   * Set the breadcrumb OnInit
   */
  ngOnInit() {
    this.breadcrumb.items = ["Feature Requests", "Create New"]
    this.clients = this.route.snapshot.data['clients'];
    this.productAreas = this.route.snapshot.data['productAreas'];
  }

  isMyTab(tag: number) {
    if (this.currentTab === tag) {
      return {
        'display':'block'
      }
    }
    return {
      'display':'none'
    }
  }

  next() {
    this.currentTab++
  }
  submit(){
    this.loading.on()
    this.featureRequestService.post(this.details).catch((error:any)=>{
      this.loading.off()
      Materialize.toast(JSON.parse(error._body).message,2000)
      return Observable.empty()
    }).subscribe((response:any)=>{
      this.loading.off()
      Materialize.toast("Feature request added",2000)
      this.router.navigate(["/"])
    });
  }
  previous() {
    this.currentTab--
  }
}
