import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as fromApp from '@app/app.state';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private readonly _store: Store<fromApp.AppState>) {}
}
