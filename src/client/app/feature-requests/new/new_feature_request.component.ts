import {Component, ElementRef, EventEmitter} from "@angular/core";
import {BreadcrumbService} from "../../shared/breadcrumb/breadcrumb.service";
import {DragulaService} from "ng2-dragula/src/app/providers/dragula.provider";
import {FeatureRequestModel} from "../../shared/model/feature_request.model";
import {ActivatedRoute} from "@angular/router";
import {Client} from "../../shared/index";
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
  // modalActions = new EventEmitter<string>();
  details = new FeatureRequestModel()
  // selectedPriority:number;
  // currentClient :Client;
  // _nameSearch: string = ""
  clients: Array<Client> = [ ]
  // clientsTmp: Array<Client> = []
  // clientsSelected: Array<Client> = []

  /**
   * Creates an instance of the FeatureRequestsComponent with the injected
   * BreadcrumbService.
   *
   * @param {BreadcrumbService} breadcrumb - The injected BreadcrumbService.
   */
  constructor(private breadcrumb: BreadcrumbService, private dragulaService: DragulaService, private route: ActivatedRoute) {
    this.details.clients = []
    // dragulaService.dropModel.subscribe((value:any) => {
    //   let fromContainer = value.splice(3)
    //   if($(fromContainer).attr("data-container")==="parent"){
    //     this.handleAdd(value.slice(1))
    //     this.filterClients(this._nameSearch)
    //   }
    //   else {
    //     this.handleRemove(value.slice(1))
    //     this.filterClients(this._nameSearch)
    //   }
    // });
  }

  /**
   * Set the breadcrumb OnInit
   */
  ngOnInit() {
    this.breadcrumb.items = ["Feature Requests", "Create New"]
    this.clients = this.route.snapshot.data['clients'];
    // this.clientsTmp = this.clients.slice(0,6)
  }
  // handleAdd(client: any){
  //   this.clientsSelected.forEach((cl:Client)=>{
  //     if (cl.id === $(client).attr("data-uuid")){
  //           this.currentClient = cl;
  //     }
  //   })
  //   this.modalActions.emit("openModal")
  // }
  // handleRemove(client: any){
  //   var toRemove:any;
  //   this.details.clients.forEach((item:any)=>{
  //     if (item.client_id === $(client).attr("data-uuid")){
  //       toRemove = item;
  //     }
  //   })
  //   this.details.clients.splice(this.details.clients.indexOf(toRemove),1)
  //   console.log(this.details)
  //
  // }
  // closeModel() {
  //   this.details.clients.push({
  //     name : this.currentClient.name,
  //     client_id : this.currentClient.id,
  //     priority : this.selectedPriority
  //   })
  //   this.currentClient = null;
  //   this.selectedPriority = null;
  //   this.modalActions.emit("closeModal");
  //   console.log(this.details)
  // }
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

  previous() {
    this.currentTab--
  }
  // filterClients(value: string){
  //   this.clientsTmp = []
  //   this.clients.forEach((item: Client)=> {
  //     let pattern = '^.*' + value + '.*$'
  //     if ((item.name.match(/pattern/i) ||item.description.match('^.*' + value + '.*$')) && this.clientsSelected.indexOf(item) === -1) {
  //       this.clientsTmp.push(item);
  //     }
  //   });
  //   this.clientsTmp = this.clientsTmp.slice(0,6)
  // }
}
