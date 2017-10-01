import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPavementLayersComponent } from './edit-pavement-layers.component';

describe('EditPavementLayersComponent', () => {
  let component: EditPavementLayersComponent;
  let fixture: ComponentFixture<EditPavementLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPavementLayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPavementLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
