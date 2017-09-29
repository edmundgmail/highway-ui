import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLanesComponent } from './edit-lanes.component';

describe('EditLanesComponent', () => {
  let component: EditLanesComponent;
  let fixture: ComponentFixture<EditLanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
