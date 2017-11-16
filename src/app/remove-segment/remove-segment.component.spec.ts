import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSegmentComponent } from './remove-segment.component';

describe('RemoveSegmentComponent', () => {
  let component: RemoveSegmentComponent;
  let fixture: ComponentFixture<RemoveSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
