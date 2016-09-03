import {Component, Pipe, Injectable, PipeTransform} from "@angular/core";
import {BreadcrumbService} from "../../shared/breadcrumb/breadcrumb.service";
import {DragulaService} from "ng2-dragula/src/app/providers/dragula.provider";
import {DetailsModel} from "./details.model";
declare const $:any;
/**
 * Created by refresh on 9/2/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-add-feature-request',
  templateUrl: 'new_feature_request.component.html',
  styleUrls:['new_feature_request.component.css']
})
export class NewFeatureRequestComponent {
  currentTab = 1
  mindate = Date.now();
  details = new DetailsModel()
  nameSearch:string
  headers:any={
    "1":"Request Details",
    "2":"Select Clients",
    "3":"Submit"
  }
  test = [
    {name: "test"},
    {name: "test1"},
    {name: "test2"},
  ]
  /**
   * Creates an instance of the FeatureRequestsComponent with the injected
   * BreadcrumbService.
   *
   * @param {BreadcrumbService} breadcrumb - The injected BreadcrumbService.
   */
  constructor(private breadcrumb: BreadcrumbService, private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value: any) => {
      console.log(value);
    });
    dragulaService.drop.subscribe((value: any) => {
      console.log(value);
    });
  }

  /**
   * Set the breadcrumb OnInit
   */
  ngOnInit() {
    this.breadcrumb.items = ["Feature Requests", "Create New"]
  }

  getClass(tag: number) {
    return {
      "active": this.currentTab === tag
    }
  }

  isDisabled(tag: number) {
    return {
      "disabled": this.currentTab !== tag
    }
  }
  isMyTab(tag: number){
    if (this.currentTab === tag){
      return {'display':"block"}
    } else {
      return {'display':"none"}
    }
  }
  getHeader(){
    return this.headers[this.currentTab]
  }
  next(){
    this.currentTab++
  }
  previous(){
    this.currentTab--
  }
}


//TODO test remove

@Pipe({
  name: 'byClientName',
  pure: false
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], name:string): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter(item => item.title === name);
  }
}
