import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {DateHelper} from "../../helpers/date.helper";
declare const $:any;
/**
 * Created by refresh on 9/5/16.
 */
@Component({
  moduleId: module.id,
  selector: 'bc-date-widget',
  templateUrl: 'date.component.html',
})
export class DateComponent implements OnInit {


  dt: Date;
  _date: string;

  get update_date(){
    return this._date
  }
  set update_date(value: any){
    console.log("NEW",value)
    this._date = value
  }
  mindate = Date.now();
  year: number
  month: string
  dayDate: number
  day: string
  @Input() edit: boolean;
  @Output() editClick:EventEmitter<void> = new EventEmitter<void>()
  @Input()
  set date(val: string) {
    this.dt = new Date(val)
    this.month = DateHelper.MONTHS[this.dt.getMonth()]
    this.year = this.dt.getFullYear()
    this.dayDate = this.dt.getDate()
    this.day = DateHelper.DAYS[this.dt.getDay()]
  }
  getDateValue(){
    return `${this.dayDate} ${DateHelper.MONTHS_LONG[this.dt.getMonth()]}, ${this.year}`
  }
  ngOnInit(): void {
//     var $input = $('#date_picker').pickadate()
//
// // Use the picker object directly.
//     var picker = $input.pickadate('picker')
//     picker.set("select",[this.year, this.month, this.dayDate])
  }
}
