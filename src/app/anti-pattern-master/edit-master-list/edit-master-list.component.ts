import { log } from 'util';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MasterListService } from '../../services/master-list.service';


@Component({
  selector: 'app-edit-master-list',
  templateUrl: './edit-master-list.component.html',
  styleUrls: ['./edit-master-list.component.css'],
  providers:[MasterListService]
})
export class EditMasterListComponent {
  hidegroup:boolean=false
  subGroupTemp:string;
  groupTemp:string;
  check:string;
  constructor(public dialogRef: MatDialogRef<EditMasterListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dataService: MasterListService) {
      this.subGroupTemp=this.data.subGroup;
      this.groupTemp=this.data.group;
     }


    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
      ]);
      enable: boolean=false;
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

      enableSubGroup(group:string,subGroup:string){

        console.log(group+"****entered group");
        if(this.groupTemp==group){
          if(this.subGroupTemp==subGroup){
            console.log("Inside checking"+ this.check + subGroup);

            this.subGroupError=false;
            return;
          }}

        this.subGroupData=this.dataService.getSubGroupList(group);
          console.log(this.subGroupData);
          if(this.subGroupData!==undefined){
          this.check = this.subGroupData.filter(item => (item==subGroup) );
          console.log(this.subGroupData.filter(item => (item==subGroup) ));
          }
          else{
            this.check='';
                            this.data.group = group;
                        //this.subGroupError=false;
                          }
          console.log("check"+this.check);



          if( this.check.length>0){
           console.log("length");
           if(this.groupTemp!=group){

            console.log("Inside checking"+ this.check + subGroup);

            this.subGroupError=true;

          }else{
           console.log("inside if");
           this.subGroupError=true;
           console.log(this.subGroupError+" ***Error");}

          }
          else{
            this.subGroupError=false;
            console.log("2****")
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
      revert(group){
        console.log(group+"group val");

          if(group==''){
            console.log("inside revert if");
            console.log(this.hidegroup);
            this.hidegroup=false;
            this.subGroupError=false;
          }
          else{
            console.log(this.data.subGroup+"subgroup val");
        if(this.data.subGroup!==undefined&&this.data.subGroup.length>0){
          console.log("else if check")
          this.hidegroup=true;
          this.enableSubGroup(group,this.data.subGroup);
        }else{
            this.hidegroup=true;
            this.enable=true;
            this.data.group=group;
            this.subGroupError=false;
        }
          }

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

      stopEdit(): void {
        this.dataService.updateItem(this.data);
        }
}
