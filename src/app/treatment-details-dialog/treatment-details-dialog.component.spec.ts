import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentDetailsDialogComponent } from './treatment-details-dialog.component';

describe('TreatmentDetailsDialogComponent', () => {
  let component: TreatmentDetailsDialogComponent;
  let fixture: ComponentFixture<TreatmentDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
