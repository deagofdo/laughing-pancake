import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject , OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-anti-pattern-rule',
  templateUrl: './edit-anti-pattern-rule.component.html',
  styleUrls: ['./edit-anti-pattern-rule.component.css']
})
export class EditAntiPatternRuleComponent implements OnInit  {

  constructor(public dialogRef: MatDialogRef<EditAntiPatternRuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

formControl = new FormControl('', [
Validators.required
// Validators.email,
]);
enable: boolean=true;
groupData:any;
subGroupData:  any;

ruleParserTypes = [
  {value: 'File', viewValue: 'File'},
  {value: 'File_RegexOr', viewValue: 'File_RegexOr'},
  {value: 'File_RegexAnd', viewValue: 'File_RegexAnd'},
  {value: 'File_RegexOr_Precondition', viewValue: 'File_RegexOr_Precondition'},
  {value: 'File_RegexAnd_Precondition', viewValue: 'File_RegexAnd_Precondition'},
  {value: 'FileRegex_RegexOr', viewValue: 'FileRegex_RegexOr'},
  {value: 'FileRegex_RegexAnd', viewValue: 'FileRegex_RegexAnd'},
  {value: 'FileRegex_RegexOr_Precondition', viewValue: 'FileRegex_RegexOr_Precondition'},
  {value: 'FileRegex_RegexAnd_Precondition', viewValue: 'FileRegex_RegexAnd_Precondition'},
  {value: 'File_MethodCall', viewValue: 'File_MethodCall'},
  
];

effortTypes=[
  {value: 'EFFORT_PER_MATCH', viewValue: 'EFFORT_PER_MATCH'},
  {value: 'EFFORT_PER_FILE_SIZE', viewValue: 'EFFORT_PER_FILE_SIZE'},
  {value: 'EFFORT_ONE_TIME', viewValue: 'EFFORT_ONE_TIME'},    
];
languages=[
  {value: 'Java', viewValue: 'Java'},
  {value: 'DotNet', viewValue: 'DotNet'},

];
enabled=[
  {value: 'true', viewValue: 'True'},
  {value: 'false', viewValue: 'False'}
];

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}

stopEdit(): void {
this.dataService.updateItem(this.data);
}
ngOnInit()
{
  //... do your calls do get res(client list)
  // var res = this.getGroupList;
  // this.groupData =this.getGroupList;
  // this.groupData=this.dataService.getGroupList();
  console.log("add antipattern rule on init");
  this.groupData=this.dataService.getGroupList();
  console.log(this.groupData);
  this.subGroupData =this.dataService.getSubGroupList(this.data.group);
  console.log("subgroupdata in add init "+this.subGroupData);
}
getSubgroupList():void{
this.enable=false;
console.log("print group");
console.log(this.data.group);
this.subGroupData =this.dataService.getSubGroupList(this.data.group);
}
}
