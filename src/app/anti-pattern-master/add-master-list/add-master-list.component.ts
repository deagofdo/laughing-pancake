import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import { antiPatternMasterList } from '../../models/antiPatternMasterList';
import { MasterListService } from '../../services/master-list.service';


@Component({
  selector: 'app-add-master-list',
  templateUrl: './add-master-list.component.html',
  styleUrls: ['./add-master-list.component.css'],
  providers:[MasterListService]
})
export class AddMasterListComponent implements OnInit {
  hidegroup:boolean=false
  constructor(public dialogRef: MatDialogRef<AddMasterListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: antiPatternMasterList,
    public dataService: MasterListService,
) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);
enable: boolean=true;
groupData:any;
subGroupData:  any;
subGroupError:boolean=false;

languages=[
  {value: 'Java', viewValue: 'Java'},
  {value: 'DotNet', viewValue: 'DotNet'},

];
enabled=[
  {value: true, viewValue: 'True'},
  {value: false, viewValue: 'False'}
];

severityList=[
  {value: 0, viewValue: '0'},
  {value: 1, viewValue: '1'},
  {value: 2, viewValue: '2'},
  {value: 3, viewValue: '3'},
  {value: 4, viewValue: '4'},
  {value: 5, viewValue: '5'},
];

migrationRecommendations=[
  {value: 'Rehost', viewValue: 'Rehost'},
  {value: 'Replatform', viewValue: 'Replatform'},
  {value: 'Refactor', viewValue: 'Refactor'},
  {value: 'Rebuild', viewValue: 'Rebuild'},  
];

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field ' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}

public confirmAdd(): void {
  console.log(this.data+"***sendtosrvice");
  
this.dataService.addItem(this.data);
}

enableSubGroup(group:string,subGroup:string){

  console.log(group+"****entered group");

  
  this.subGroupData=this.dataService.getSubGroupList(group);
    console.log(this.subGroupData);
    const check = this.subGroupData.filter(item => (item==subGroup) );
    console.log(this.subGroupData.filter(item => (item==subGroup) ));
    
    if( check.length>0){
     
     console.log("inside if");
     this.subGroupError=true;
     console.log(this.subGroupError+" ***Error");
     
    }
    else{
      this.subGroupError=false;
    }
    
  }


ngOnInit()
{
  console.log("add antipattern rule on init");
  this.groupData=this.dataService.getGroupList();
  console.log(this.groupData);
  console.log("subgroupdata in add init "+this.subGroupData);
}
getSubgroupList():void{
  this.enable=false;
  console.log("print group");
  console.log(this.data.group);
 
}
focusout(group){
  this.hidegroup=false;
  console.log("change func"+group);
  this.subGroupData =this.dataService.getSubGroupList(this.data.group);
  this.data.group = group;

}

assignToGroupInput(group){
  console.log("select opts");
  console.log(group);
  if(this.data.subGroup!=''){
    this.enableSubGroup(group,this.data.subGroup);
    this.data.group = group;
    this.hidegroup=false;
    this.enable=false 
  }
  else{
  this.subGroupData =this.dataService.getSubGroupList(this.data.group);
  this.data.group = group;
  this.hidegroup=false;
  this.enable=false
}
}
revert(group){
  console.log(group+"groujp val");
  
  if(group==''){
    console.log("inside revert if");
    console.log(this.hidegroup);
    this.hidegroup=false;
    this.subGroupError=false;
  }
  else{
    console.log("inside else");
    
    this.hidegroup=true;
    this.enable=true;
    this.data.group=group;
    this.subGroupError=false;
  }
  
  
}
arrowkeyLocation = 0;

moveUporDown(event: KeyboardEvent) {
    switch (event.keyCode) {
        case 38: // this is the ascii of arrow up
                 this.arrowkeyLocation--;
                 break;
        case 40: // this is the ascii of arrow down
                 this.arrowkeyLocation++;
                 break;
    }
}
}