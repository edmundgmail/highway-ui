import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoadFeaturesComponent } from './edit-road-features.component';

describe('EditRoadFeaturesComponent', () => {
  let component: EditRoadFeaturesComponent;
  let fixture: ComponentFixture<EditRoadFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoadFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoadFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
