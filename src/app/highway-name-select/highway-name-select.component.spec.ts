import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighwayNameSelectComponent } from './highway-name-select.component';

describe('HighwayNameSelectComponent', () => {
  let component: HighwayNameSelectComponent;
  let fixture: ComponentFixture<HighwayNameSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighwayNameSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighwayNameSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
