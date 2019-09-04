import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcercisesManagementPageComponent } from './excercises-management-page.component';

describe('ExcercisesManagementPageComponent', () => {
  let component: ExcercisesManagementPageComponent;
  let fixture: ComponentFixture<ExcercisesManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcercisesManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcercisesManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
