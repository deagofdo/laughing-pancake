import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {rules} from '../models/rules';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ToasterModule, ToasterService} from 'angular2-toaster';



@Injectable()
export class DataService {
  private readonly API_URL = 'http://localhost:9090';
  dataChange: BehaviorSubject<rules[]> = new BehaviorSubject<rules[]>([]);
  groupData:BehaviorSubject<any>=new BehaviorSubject<any>([]);
  dialogData: any;
  groupList:any;
  groupSubgroupList:any;
  constructor (private httpClient: HttpClient) {}
  
  get data(): rules[] {
    return this.dataChange.value;
  }
  get groupdata(): string[] {
    console.log("in groupdata in data service ");
    return this.groupData.value;
  }
  getDialogData() {
    console.log("Inside get Dialog Data");
    
    console.log(this.dialogData);
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<rules[]>(this.API_URL+'/getAllAntiPatternsRules').subscribe(data => {
      console.log("Inside Get All Issue Data Service");
      console.log(data);
      
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  getGroupList(): any {
    this.httpClient.get<any>(this.API_URL+'/getMasterGroups').subscribe(data => {
      this.groupList=Object.keys(data).sort();
      this.groupSubgroupList=data;
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
  addIssue (issue: rules): void {
    console.log("Inside add Issue");
    
    this.dialogData = issue;
  }

  updateIssue (issue: rules): void {
    console.log("From update Issue");
    
    console.log(issue);
    
    this.dialogData = issue;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }
  
     addItem(issueObj: rules): void {
     this.httpClient.post(this.API_URL+'/AddRules', issueObj).subscribe(data => {
	  console.log(issueObj.id); 
      this.dialogData = issueObj;
      },
      (err: HttpErrorResponse) => {
		  console.log(err.name);
		  console.log(err.message);
    });  
}
	 
	updateItem(issueObj: rules): void {
    console.log("Inaside Update Item");
    
    this.httpClient.post(this.API_URL+'/saveUpdatedRules', issueObj).subscribe(data => {
        this.dialogData = issueObj;
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




/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




