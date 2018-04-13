import { Pipe, PipeTransform } from '@angular/core';
import {DataService} from './services/data.service';
@Pipe({
  name: 'filtergroup'
})
export class FiltergroupPipe implements PipeTransform {
  constructor(public dataService: DataService) { }
  groupData:any
  transform(items: any, term): any {
    console.log("Inside pipe");
    console.log(items);
    
    
    this.groupData=this.dataService.getGroupList();
    console.log(this.groupData);
    return (term!=null)
    ? this.groupData.filter(item => (item.indexOf(term) )!== -1)
    : null;
  }

}
