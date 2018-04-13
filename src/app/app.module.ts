import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes ,Router} from '@angular/router';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatToolbarModule,MatFormFieldModule,MatSelectModule,
} from '@angular/material';
import {DataService} from './services/data.service';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AntiPatternRulesComponent } from './anti-pattern-rules/anti-pattern-rules.component';
import { AntiPatternMasterComponent } from './anti-pattern-master/anti-pattern-master.component';
import { AddComponent } from './anti-pattern-rules/add/add.component';
import { EditAntiPatternRuleComponent } from './anti-pattern-rules/edit-anti-pattern-rule/edit-anti-pattern-rule.component';
import { AddMasterListComponent } from './anti-pattern-master/add-master-list/add-master-list.component';
import { EditMasterListComponent } from './anti-pattern-master/edit-master-list/edit-master-list.component';
import { MasterListService } from './services/master-list.service';
import {MatRadioModule} from '@angular/material/radio';
import { EditRulesComponent } from './edit-rules/edit-rules.component';
import { FiltergroupPipe } from './filtergroup.pipe';
import { FilterSubGroupPipe } from './filter-sub-group.pipe';
const appRoutes: Routes = [
  { path: 'antiPatternRules', component: AntiPatternRulesComponent },
  { path: 'antiPatternRulesMaster', component: AntiPatternMasterComponent },
  {path:'edit', component:EditRulesComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AntiPatternRulesComponent,
    AntiPatternMasterComponent,
    AddComponent,
    EditAntiPatternRuleComponent,
    AddMasterListComponent,
    EditMasterListComponent,
    EditRulesComponent,
    FiltergroupPipe,
    FilterSubGroupPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule

  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AddComponent,
    EditAntiPatternRuleComponent,
    AntiPatternMasterComponent,
    AddMasterListComponent,
    EditMasterListComponent
  ],
  providers: [
    DataService,
    MasterListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule{ }
 