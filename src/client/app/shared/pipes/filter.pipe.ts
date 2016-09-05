import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value.length === 0){
      return value;
    }
    let resultArray:any=[];
    console.log(args,value)
    for (let item of value){
      console.log(item,item[args[0]],args[0])
      if ( item[args[0]].match('^.*' + args[1] + '.*$')){
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
