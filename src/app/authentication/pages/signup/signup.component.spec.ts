import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthActions } from '@authSt/action-types';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: MockStore;

  const initialState = {
    user: {
      userId: '',
      email: '',
      name: '',
      photoURL: '',
      emailVerified: false,
    },
    isLogged: false,
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid form when starts', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should be valid form when populate', () => {
    component.signupForm.controls['name'].setValue('new user');
    component.signupForm.controls['email'].setValue('user@email.com');
    component.signupForm.controls['password'].setValue('123456789');

    expect(component.signupForm.valid).toBeTruthy();
  });

  it('should dispatch LoginWithGoogle action in loginWithGoogleHandler call', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough(); // spy on the store
    fixture.detectChanges(); // used to call ngOnInit, maybe it is not needed

    component.loginWithGoogleHandler();

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.LoginWithGoogle());
  });

  it('should dispatch SignUp action in userSignUpHandler call', () => {
    component.signupForm.controls['name'].setValue('new user');
    component.signupForm.controls['email'].setValue('user@email.com');
    component.signupForm.controls['password'].setValue('123456789');

    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough(); // spy on the store

    component.userSignUpHandler();

    const { name, email, password } = component.signupForm.value;

    const payload = {
      name,
      email,
      password,
    };

    expect(dispatchSpy).toHaveBeenCalledWith(
      Object({
        payload: Object({ ...payload }),
        type: AuthActions.Actions.SIGNUP,
      })
    );
  });
});
