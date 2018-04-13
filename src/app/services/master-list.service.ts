import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { antiPatternMasterList } from '../models/antiPatternMasterList';

@Injectable()
export class MasterListService {
  private readonly API_URL = 'http://localhost:9090';
  dataChange: BehaviorSubject<antiPatternMasterList[]> = new BehaviorSubject<antiPatternMasterList[]>([]);
  // Temporarily stores data from dialogs
  groupData:BehaviorSubject<any>=new BehaviorSubject<any>([]);
  dialogData: any;
  groupList:any;
  groupSubgroupList:any;

  constructor (private httpClient: HttpClient) {}
  
  get data(): antiPatternMasterList[] {
    return this.dataChange.value;
  }
  get groupdata(): string[] {
    console.log("in Antipattern Master groupdata in data service ");
    return this.groupData.value;
  }
  getGroupList(): any {
    this.httpClient.get<any>(this.API_URL+'/getMasterGroups').subscribe(data => {
      this.groupList=Object.keys(data).sort();
      this.groupSubgroupList=data;
      console.log("groupSubgroupList Anti Master");
      console.log(this.groupSubgroupList);
      
      this.groupData.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
      return this.groupList;
  }
  getSubGroupList(group:string):any{
    console.log("getSubGroupList ");
    console.log(this.groupSubgroupList[group]);
    return this.groupSubgroupList[group];

  }
  getDialogData() {
    console.log("Insidde gtet dialog");
    console.log(this.dialogData);
    
    
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<antiPatternMasterList[]>(this.API_URL+'/getAllMasterRules').subscribe(data => {
      console.log("Inside Get All Issue Data Service");
      console.log(data);
      
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (issue: antiPatternMasterList): void {
    this.dialogData = issue;
  }

  updateIssue (issue: antiPatternMasterList): void {
    console.log("From update Issue");
    
    console.log(issue); 
    this.dialogData = issue;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }
  
     addItem(issueObj: antiPatternMasterList): void {
     this.httpClient.post(this.API_URL+'/AddMasterRules', issueObj).subscribe(data => {
	  console.log(issueObj.id); 
      this.dialogData = issueObj;
      },
      (err: HttpErrorResponse) => {
		  console.log(err.name);
		  console.log(err.message);
    });  
}
	 
	updateItem(issueObj: antiPatternMasterList): void {
    console.log("update Item");
   
    this.dialogData = issueObj;

    this.httpClient.post(this.API_URL+'/saveUpdatedMasterRules', issueObj).subscribe(data => {
        
        console.log(this.dialogData);
       },
      (err: HttpErrorResponse) => {
        console.log(err.name);
		console.log(err.message);
      }
    );
  }
  
   deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
    
      },
      (err: HttpErrorResponse) => {
        console.log(err.name);
		console.log(err.message);
      }
    );
  }
}	  

