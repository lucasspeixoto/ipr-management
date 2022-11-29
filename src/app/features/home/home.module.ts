import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { LayoutModule } from '@layout/layout.module';
import { MaterialModule } from '@sharedM/material.module';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '@sharedM/shared.module';

import { HomeComponent } from './pages/home/home.component';

const billsRoutes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    LayoutModule,
    RouterModule.forChild(billsRoutes),
    EffectsModule.forFeature([]),
  ],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
