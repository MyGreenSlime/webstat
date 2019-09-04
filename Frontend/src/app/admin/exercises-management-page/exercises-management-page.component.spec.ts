import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { exercisesManagementPageComponent } from './exercises-management-page.component';

describe('exercisesManagementPageComponent', () => {
  let component: exercisesManagementPageComponent;
  let fixture: ComponentFixture<exercisesManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ exercisesManagementPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(exercisesManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
