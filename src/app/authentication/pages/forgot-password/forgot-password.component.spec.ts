import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthActions } from '@app/authentication/store/action-types';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
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
      declarations: [ForgotPasswordComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid form when starts', () => {
    expect(component.forgotPasswordForm.valid).toBeFalsy();
  });

  it('should be valid form when populate', () => {
    component.forgotPasswordForm.controls['email'].setValue('user@email.com');

    expect(component.forgotPasswordForm.valid).toBeTruthy();
  });

  it('should dispatch ForgotPassword action in forgotPasswordHandler call', () => {
    component.forgotPasswordForm.controls['email'].setValue('user@email.com');

    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough(); // spy on the store

    component.forgotPasswordHandler();

    const { email } = component.forgotPasswordForm.value;

    expect(dispatchSpy).toHaveBeenCalledWith(
      Object({
        payload: email,
        type: AuthActions.Actions.FORGOT_PASSWORD,
      })
    );
  });
});
