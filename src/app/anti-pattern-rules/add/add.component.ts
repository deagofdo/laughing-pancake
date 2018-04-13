import {MAT_DIALOG_DATA, MatDialogRef,MatFormFieldModule,MatSelectModule} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {rules} from '../../models/rules';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: rules,
    public dataService: DataService,
) { }
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
  
formControl = new FormControl('', [
Validators.required
// Validators.email,
]);

getErrorMessage() {
return this.formControl.hasError('required') ? 'Required field' :
this.formControl.hasError('email') ? 'Not a valid email' :
'';
}
checkgroupError(){
  this.formControl.hasError
}

submit() {
// emppty stuff
}

onNoClick(): void {
this.dialogRef.close();
}

public confirmAdd(): void {
this.dataService.addItem(this.data);
}
// public getGroupList():string[]{
//   console.log(this.dataService.groupdata);
//   return this.dataService.groupdata;
// }
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
this.subGroupData =this.dataService.getSubGroupList(this.data.group);

}

}