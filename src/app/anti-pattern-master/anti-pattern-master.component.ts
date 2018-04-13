import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
// import {rules} from '../models/rules';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
//import {AddDialogComponent} from '../dialogs/add/add.dialog.component';
// import {EditDialogComponent} from '../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import { antiPatternMasterList } from '../models/antiPatternMasterList';
import {MasterListService} from '../services/master-list.service';
import {AddMasterListComponent} from './add-master-list/add-master-list.component';
import { EditMasterListComponent } from './edit-master-list/edit-master-list.component';
@Component({
  selector: 'app-anti-pattern-master',
  templateUrl: './anti-pattern-master.component.html',
  styleUrls: ['./anti-pattern-master.component.css'],
  providers:[MasterListService]
})
export class AntiPatternMasterComponent implements OnInit {
  // displayedColumns = ['id','ruleCategory','language','group', 'subGroup', 'ruleType', 'desc','effortType','ruleParserType','enabled','fileList','regexPreCondition','regexList','actions'];
  displayedColumns = ['language','group', 'subGroup', 'desc','effortOneTime','effortPerMatch','effortPerFileSize','severity','migrationRecommendation4R','recommendation','enabled','actions'];
  exampleDatabase: MasterListService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  groupData:any;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: MasterListService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    console.log("AntiPattern Master page");
    this.groupData=this.dataService.getGroupList();
    console.log("Antipattern Master log ngonInit after getting group list")
    console.log(this.groupData);
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: antiPatternMasterList) {
    const dialogRef = this.dialog.open(AddMasterListComponent, {
      data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result+"***result");
      
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
       // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.loadData();
      }
    });
  }

 
  startEdit(i: number, id: number, language: string, group: string, subGroup: string, desc: string, effortOneTime: number, effortPerMatch: number, effortPerFileSize: number, severity: number, migrationRecommendation4R: string, recommendation: string, enabled: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    console.log("id "+id);
    const dialogRef = this.dialog.open(EditMasterListComponent, {
      data: {id: id, language: language, group: group, subGroup: subGroup, desc: desc, effortOneTime: effortOneTime, effortPerMatch: effortPerMatch, effortPerFileSize: effortPerFileSize, severity: severity, migrationRecommendation4R: migrationRecommendation4R, recommendation: recommendation, enabled: enabled}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log("Inside if");
        
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        console.log("found index "+foundIndex);
        console.log("Before assignemnt val***"+ JSON.stringify(this.exampleDatabase.dataChange.value[foundIndex]));
       // this.dataService.getDialogData();
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData(); 
        
        
        // And lastly refresh table
        this.loadData();
      }
    });
  }

  deleteItem(i: number, id: number, language: string, group: string, subGroup: string, desc: string, effortOneTime: number, effortPerMatch: number, effortPerFileSize: number, severity: number, migrationRecommendation4R: string, recommendation: string, enabled: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, language: language, group: group, subGroup: subGroup, desc: desc, effortOneTime: effortOneTime, effortPerMatch: effortPerMatch, effortPerFileSize: effortPerFileSize, severity: severity, migrationRecommendation4R: migrationRecommendation4R, recommendation: recommendation, enabled: enabled}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.exampleDatabase = new MasterListService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    console.log("data Source");
    console.log(this.dataSource);
    
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}


export class ExampleDataSource extends DataSource<antiPatternMasterList> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: antiPatternMasterList[] = [];
  renderedData: antiPatternMasterList[] = [];

  constructor(public _exampleDatabase: MasterListService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<antiPatternMasterList[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    console.log("Inside Connect");
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllIssues();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((issue: antiPatternMasterList) => {
        const searchStr = (issue.id  + issue.language + issue.group + issue.subGroup + issue.desc + issue.effortOneTime + issue.effortPerMatch  + issue.effortPerFileSize  + issue.severity + issue.migrationRecommendation4R  + issue.recommendation + issue.enabled).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: antiPatternMasterList[]): antiPatternMasterList[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: any;
      let propertyB: any;

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
		case 'language': [propertyA, propertyB] = [a.language, b.language]; break;
		case 'group': [propertyA, propertyB] = [a.group, b.group]; break;
		case 'subGroup': [propertyA, propertyB] = [a.subGroup, b.subGroup]; break;
    case 'desc': [propertyA, propertyB] = [a.desc, b.desc]; break;
    case 'effortOneTime': [propertyA, propertyB] = [a.effortOneTime, b.effortOneTime]; break;
    case 'effortPerMatch': [propertyA, propertyB] = [a.effortPerMatch, b.effortPerMatch]; break;
    case 'effortPerFileSize': [propertyA, propertyB] = [a.effortPerFileSize, b.effortPerFileSize]; break;
		case 'severity': [propertyA, propertyB] = [a.severity, b.severity]; break;
    case 'migrationRecommendation4R': [propertyA, propertyB] = [a.migrationRecommendation4R, b.migrationRecommendation4R]; break;
    case 'recommendation': [propertyA, propertyB] = [a.recommendation, b.recommendation]; break;
    case 'enabled': [propertyA, propertyB] = [a.enabled, b.enabled]; break;
  }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

