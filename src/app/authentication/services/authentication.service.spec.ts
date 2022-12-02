import { TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '@envs/environment';

import { AuthenticationService } from './authentication.service';

fdescribe('Service: Authentication', () => {
  let service: AuthenticationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      providers: [AuthenticationService, AngularFireAuth],
    });
  }));

  beforeEach(() => {
    service = TestBed.inject(AuthenticationService);
  });

  it('should instanciate the service', () => {
    expect(service).toBeTruthy();
  });

  it('should call service isAuth method', () => {
    const isAuthSpyOn = spyOn(service, 'isAuth').and.callThrough();

    service.isAuth();

    expect(isAuthSpyOn).toHaveBeenCalled();
  });
});
