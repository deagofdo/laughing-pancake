import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSubGroup'
})
export class FilterSubGroupPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
