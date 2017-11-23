import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanesComponent } from './add-lanes.component';

describe('AddLanesComponent', () => {
  let component: AddLanesComponent;
  let fixture: ComponentFixture<AddLanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
