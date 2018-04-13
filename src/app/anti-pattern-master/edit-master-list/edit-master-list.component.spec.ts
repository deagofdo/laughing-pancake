import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMasterListComponent } from './edit-master-list.component';

describe('EditMasterListComponent', () => {
  let component: EditMasterListComponent;
  let fixture: ComponentFixture<EditMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
