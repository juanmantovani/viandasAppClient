import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMenuCompleteComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: ViewMenuCompleteComponent;
  let fixture: ComponentFixture<ViewMenuCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMenuCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMenuCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
