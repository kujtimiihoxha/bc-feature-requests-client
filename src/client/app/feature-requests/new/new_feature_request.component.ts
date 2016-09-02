import {Component} from "@angular/core";
import {BreadcrumbService} from "../../shared/breadcrumb/breadcrumb.service";
import {DragulaService} from "ng2-dragula/src/app/providers/dragula.provider";
/**
 * Created by refresh on 9/2/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-add-feature-request',
  templateUrl: 'new_feature_request.component.html',
})
export class NewFeatureRequestComponent {
  test = [
    {name:"test"},
    {name:"test1"},
    {name:"test2"},
  ]
  /**
   * Creates an instance of the FeatureRequestsComponent with the injected
   * BreadcrumbService.
   *
   * @param {BreadcrumbService} breadcrumb - The injected BreadcrumbService.
   */
  constructor(private breadcrumb:BreadcrumbService, private dragulaService: DragulaService) {
    dragulaService.drag.subscribe((value) => {
      console.log(value);
    });
    dragulaService.drop.subscribe((value) => {
      console.log(value);
    });
  }
  /**
   * Set the breadcrumb OnInit
   */
  ngOnInit() {
    this.breadcrumb.items=["Feature Requests","Create New"]
  }
}
