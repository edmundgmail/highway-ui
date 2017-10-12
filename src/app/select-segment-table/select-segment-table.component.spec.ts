import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSegmentTableComponent } from './select-segment-table.component';

describe('SelectSegmentTableComponent', () => {
  let component: SelectSegmentTableComponent;
  let fixture: ComponentFixture<SelectSegmentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSegmentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSegmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
