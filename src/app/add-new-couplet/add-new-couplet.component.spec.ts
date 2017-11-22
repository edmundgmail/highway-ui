import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCoupletComponent } from './add-new-couplet.component';

describe('AddNewCoupletComponent', () => {
  let component: AddNewCoupletComponent;
  let fixture: ComponentFixture<AddNewCoupletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCoupletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCoupletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
