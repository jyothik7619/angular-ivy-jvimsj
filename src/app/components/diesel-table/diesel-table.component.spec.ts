import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselTableComponent } from './diesel-table.component';

describe('DieselTableComponent', () => {
  let component: DieselTableComponent;
  let fixture: ComponentFixture<DieselTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieselTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieselTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
