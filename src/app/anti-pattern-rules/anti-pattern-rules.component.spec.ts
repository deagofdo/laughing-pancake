import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiPatternRulesComponent } from './anti-pattern-rules.component';

describe('AntiPatternRulesComponent', () => {
  let component: AntiPatternRulesComponent;
  let fixture: ComponentFixture<AntiPatternRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiPatternRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiPatternRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
