import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHighwayComponent } from './add-new-highway.component';

describe('AddNewHighwayComponent', () => {
  let component: AddNewHighwayComponent;
  let fixture: ComponentFixture<AddNewHighwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewHighwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewHighwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
