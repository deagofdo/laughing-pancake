import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterListComponent } from './add-master-list.component';

describe('AddMasterListComponent', () => {
  let component: AddMasterListComponent;
  let fixture: ComponentFixture<AddMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
