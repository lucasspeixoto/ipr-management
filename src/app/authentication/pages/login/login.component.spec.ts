import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthActions } from '@authSt/action-types';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch LoginWithGoogle action in loginWithGoogleHandler call', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough(); // spy on the store
    fixture.detectChanges(); // used to call ngOnInit, maybe it is not needed

    component.loginWithGoogleHandler();

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.LoginWithGoogle());
  });

  it('should be invalid form when starts', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be valid form when populate', () => {
    component.loginForm.controls['email'].setValue('user@email.com');
    component.loginForm.controls['password'].setValue('123456789');

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should dispatch Login action in userLoginHandler call', () => {
    component.loginForm.controls['email'].setValue('user@email.com');
    component.loginForm.controls['password'].setValue('123456789');

    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough(); // spy on the store

    component.userLoginHandler();

    const { email, password } = component.loginForm.value;

    const payload = {
      email: email!,
      password: password!,
    };

    expect(dispatchSpy).toHaveBeenCalledWith(
      Object({
        payload: Object({ ...payload }),
        type: '[Login Page] User Login',
      })
    );
  });
});
