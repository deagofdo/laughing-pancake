import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAntiPatternRuleComponent } from './edit-anti-pattern-rule.component';

describe('EditAntiPatternRuleComponent', () => {
  let component: EditAntiPatternRuleComponent;
  let fixture: ComponentFixture<EditAntiPatternRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAntiPatternRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAntiPatternRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
