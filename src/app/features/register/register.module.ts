import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { LayoutModule } from '@layout/layout.module';
import { MaterialModule } from '@sharedM/material.module';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '@sharedM/shared.module';
import { RegisterComponent } from './pages/register/register.component';

const routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    LayoutModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([]),
  ],
  declarations: [RegisterComponent],
  providers: [],
})
export class RegisterModule {}
