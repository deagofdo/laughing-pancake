import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiPatternMasterComponent } from './anti-pattern-master.component';

describe('AntiPatternMasterComponent', () => {
  let component: AntiPatternMasterComponent;
  let fixture: ComponentFixture<AntiPatternMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiPatternMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiPatternMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
