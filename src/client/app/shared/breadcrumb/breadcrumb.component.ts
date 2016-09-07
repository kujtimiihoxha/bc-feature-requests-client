/**
 * Created by refresh on 9/1/16.
 */
import {Component} from "@angular/core";
import {BreadcrumbService} from "./breadcrumb.service";
@Component(
  {
    moduleId: module.id,
    selector: 'bc-breadcrumb',
    templateUrl: 'breadcrumb.component.html',
    styleUrls: ['breadcrumb.component.css'],
  }
)
export class BreadcrumbComponent {
  constructor(private breadcrumb: BreadcrumbService) {
    console.log('Test')
    console.log(breadcrumb)
  }
}
