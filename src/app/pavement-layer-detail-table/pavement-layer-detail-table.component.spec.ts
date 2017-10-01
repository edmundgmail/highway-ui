import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavementLayerDetailTableComponent } from './pavement-layer-detail-table.component';

describe('PavementLayerDetailTableComponent', () => {
  let component: PavementLayerDetailTableComponent;
  let fixture: ComponentFixture<PavementLayerDetailTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavementLayerDetailTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavementLayerDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
