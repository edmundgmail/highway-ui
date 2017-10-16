import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSegmentComponent } from './transfer-segment.component';

describe('TransferSegmentComponent', () => {
  let component: TransferSegmentComponent;
  let fixture: ComponentFixture<TransferSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
