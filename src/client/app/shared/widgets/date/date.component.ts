import {Component, Input, OnInit} from "@angular/core";
/**
 * Created by refresh on 9/5/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-date-widget',
  templateUrl: 'date.component.html',
})
export class DateComponent {

  dt:Date;
  year :number
  month:string
  dayDate:number
  day:string
  days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  @Input()
  set date(val:string){
    this.dt = new Date(val)
    this.month = this.months[this.dt.getMonth()]
    this.year = this.dt.getFullYear()
    this.dayDate = this.dt.getDate()
    this.day = this.days[this.dt.getDay()]
  }
}
