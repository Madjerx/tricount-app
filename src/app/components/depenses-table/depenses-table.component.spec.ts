import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepensesTableComponent } from './depenses-table.component';

describe('DepensesTableComponent', () => {
  let component: DepensesTableComponent;
  let fixture: ComponentFixture<DepensesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepensesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepensesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
