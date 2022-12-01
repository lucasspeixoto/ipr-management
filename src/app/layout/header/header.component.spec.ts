import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MessageState } from '@app/shared/store/message/message.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore;

  const initialState: MessageState = {
    messages: [],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invert the isMenuOpened variable in openMenu call', () => {
    const spiedComponent = spyOn(component, 'openMenu').and.callThrough();

    component.openMenu();

    expect(spiedComponent).toHaveBeenCalledTimes(1);
    expect(component.isMenuOpened).toBe(true);
  });

  it('should dispatch Logout action in signOut call', () => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();

    component.signOut();

    expect(dispatchSpy).toHaveBeenCalledWith(Object({ type: '[Header] Logout user' }));
  });
});
