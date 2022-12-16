import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalRegisterComponent } from './personal-register.component';

describe('PersonalRegisterComponent', () => {
  let component: PersonalRegisterComponent;
  let fixture: ComponentFixture<PersonalRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
