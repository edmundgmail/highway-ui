import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRampComponent } from './add-new-ramp.component';

describe('AddNewRampComponent', () => {
  let component: AddNewRampComponent;
  let fixture: ComponentFixture<AddNewRampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
