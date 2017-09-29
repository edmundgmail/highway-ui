import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSegmentComponent } from './select-segment.component';

describe('SelectSegmentComponent', () => {
  let component: SelectSegmentComponent;
  let fixture: ComponentFixture<SelectSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
