import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSegmentTableComponent } from './add-segment-table.component';

describe('AddSegmentTableComponent', () => {
  let component: AddSegmentTableComponent;
  let fixture: ComponentFixture<AddSegmentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSegmentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSegmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
