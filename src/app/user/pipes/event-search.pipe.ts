import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventSearch'
})
export class EventSearchPipe implements PipeTransform {

  transform(value: any, filterString: string) {
    if(value.length === 0){
      return value;
    }
    const data = [];
    for (const event of value) {
      if(event.title.toLowerCase().startsWith((filterString).toLowerCase())){
        data.push(event);
      }
    }
    return data;
    
  }

}
