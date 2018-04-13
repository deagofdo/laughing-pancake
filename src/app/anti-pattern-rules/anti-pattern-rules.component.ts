import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {rules} from '../models/rules';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
// import {AddDialogComponent} from '../dialogs/add/add.dialog.component';
// import {EditDialogComponent} from '../dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from '../dialogs/delete/delete.dialog.component';
import { AddComponent } from './add/add.component';
import { EditAntiPatternRuleComponent } from './edit-anti-pattern-rule/edit-anti-pattern-rule.component';
@Component({
  selector: 'app-anti-pattern-rules',
  templateUrl: './anti-pattern-rules.component.html',
  styleUrls: ['./anti-pattern-rules.component.css']
})
export class AntiPatternRulesComponent implements OnInit {
  // displayedColumns = ['id','ruleCategory','language','group', 'subGroup', 'ruleType', 'desc','effortType','ruleParserType','enabled','fileList','regexPreCondition','regexList','actions'];
  displayedColumns = ['language','group', 'subGroup', 'ruleType', 'desc','effortType','ruleParserType','enabled','fileList','regexPreCondition','regexList','actions'];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  groupData:any;
  // subgroupData:any;
  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public dataService: DataService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    console.log("AntiPattern page");
    this.groupData=this.dataService.getGroupList();
    console.log("log ngonInit after getting group list")
    console.log(this.groupData);
    
    
    //this.subgroupData=this.dataService.getGroupSubgroupList();
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(issue: rules) {
    const dialogRef = this.dialog.open(AddComponent, {
      data: {issue: issue }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.loadData();
      }
    });
  }

  

  startEdit(i: number, id: number, ruleCategory: string, language: string, group: string, subGroup: string, ruleType: string, desc: string, effortType: string,ruleParserType: string,enabled: string,fileList: any,regexPreCondition: string, regexList: any) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    
    const dialogRef = this.dialog.open(EditAntiPatternRuleComponent, {
      data: {id: id, ruleCategory: ruleCategory, language: language,  group: group, subGroup: subGroup, ruleType: ruleType, desc: desc,effortType: effortType,ruleParserType: ruleParserType,enabled: enabled, fileList: fileList,regexPreCondition: regexPreCondition,regexList: regexList}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("After Closed");
      
      if (result === 1) {

        console.log("Inside if block");
        
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x =>  x.id === this.id   );
        // Then you update that record using data from dialogData (values you enetered)
        console.log("val***"+this.exampleDatabase.dataChange.value[foundIndex]);
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.loadData();
        //this.loadData();
      }
      
    });
  }

  deleteItem(i: number, id: number, ruleCategory: string,  language: string, group: string, subGroup: string, ruleType: string, desc: string, effortType: string,ruleParserType: string,enabled: string,fileList: any,regexPreCondition: string, regexList: any) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id, ruleCategory: ruleCategory, language: language,  group: group, subGroup: subGroup, ruleType: ruleType, desc: desc,effortType: effortType,ruleParserType: ruleParserType,enabled: enabled, fileList: fileList,regexPreCondition: regexPreCondition,regexList: regexList}
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
    this.exampleDatabase = new DataService(this.httpClient);
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


export class ExampleDataSource extends DataSource<rules> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: rules[] = [];
  renderedData: rules[] = [];

  constructor(public _exampleDatabase: DataService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
      this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<rules[]> {
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
      this.filteredData = this._exampleDatabase.data.slice().filter((issue: rules) => {
        const searchStr = (issue.id + issue.ruleCategory + issue.language + issue.group + issue.subGroup + issue.ruleType + issue.desc + issue.effortType  + issue.ruleParserType  + issue.enabled + issue.fileList  + issue.regexPreCondition + issue.regexList).toLowerCase();
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
  sortData(data: rules[]): rules[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: any;
      let propertyB: any;

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
		case 'ruleCategory': [propertyA, propertyB] = [a.ruleCategory, b.ruleCategory]; break;
		case 'language': [propertyA, propertyB] = [a.language, b.language]; break;
		case 'group': [propertyA, propertyB] = [a.group, b.group]; break;
		case 'subGroup': [propertyA, propertyB] = [a.subGroup, b.subGroup]; break;
		case 'ruleType': [propertyA, propertyB] = [a.ruleType, b.ruleType]; break;
    case 'desc': [propertyA, propertyB] = [a.desc, b.desc]; break;
    case 'effortType': [propertyA, propertyB] = [a.effortType, b.effortType]; break;
		case 'ruleParserType': [propertyA, propertyB] = [a.ruleParserType, b.ruleParserType]; break;
    case 'enabled': [propertyA, propertyB] = [a.enabled, b.enabled]; break;
    case 'fileList': [propertyA, propertyB] = [a.fileList, b.fileList]; break;
    case 'regexPreCondition': [propertyA, propertyB] = [a.regexPreCondition, b.regexPreCondition]; break;
		case 'regexList': [propertyA, propertyB] = [a.regexList, b.regexList]; break;

      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
