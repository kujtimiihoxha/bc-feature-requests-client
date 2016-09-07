import {Component, Input} from "@angular/core";
/**
 * Created by refresh on 9/5/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-fr-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {

  @Input() main: string;
  @Input() currentTab: number
  headers: any = {
    '1': 'Request Details',
    '2': 'Select Clients',
    '3': 'Submit'
  }
  help: any = {
    '1': '',
    '2': 'Drag clients to the highlighted area',
    '3': ''
  }

  getHeader() {
    return this.headers[this.currentTab]
  }

  getHelp() {
    return this.help[this.currentTab]
  }

  isDisabled(tag: number) {
    return {
      'disabled': this.currentTab !== tag
    }
  }

  getClass(tag: number) {
    return {
      'active': this.currentTab === tag
    }
  }
}
