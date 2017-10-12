import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSegmentLanesTableComponent } from './select-segment-lanes-table.component';

describe('SelectSegmentLanesTableComponent', () => {
  let component: SelectSegmentLanesTableComponent;
  let fixture: ComponentFixture<SelectSegmentLanesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSegmentLanesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSegmentLanesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
