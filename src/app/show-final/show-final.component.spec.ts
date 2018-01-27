import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFinalComponent } from './show-final.component';

describe('ShowFinalComponent', () => {
  let component: ShowFinalComponent;
  let fixture: ComponentFixture<ShowFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
