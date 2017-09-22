import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSegmentPointComponent } from './select-segment-point.component';

describe('SelectSegmentPointComponent', () => {
  let component: SelectSegmentPointComponent;
  let fixture: ComponentFixture<SelectSegmentPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSegmentPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSegmentPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
