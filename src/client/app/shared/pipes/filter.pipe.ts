import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length === 0) {
      return value;
    }
    let resultArray: any = [];
    for (let item of value) {
      if (item[args[0]].match(new RegExp('^.*' + args[1] + '.*$', 'ig'))) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
