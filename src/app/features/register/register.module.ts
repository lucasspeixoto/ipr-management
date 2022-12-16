/* eslint-disable max-len */
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { LayoutModule } from '@layout/layout.module';
import { MaterialModule } from '@sharedM/material.module';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '@sharedM/shared.module';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { GetAddressService } from '@app/shared/services/get-address/get-address.service';
import { RegisterService } from './services/register.service';
import { RegisterEffects } from '@registerSt/register/register.effects';
import { PersonalRegisterComponent } from '@registerC/personal-register/personal-register.component';
import { SupplementaryRegisterComponent } from './components/supplementary-register/supplementary-register.component';
import { EcclesiasticalRegisterComponent } from './components/ecclesiastical-register/ecclesiastical-register.component';

const routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    LayoutModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([RegisterEffects]),
  ],
  declarations: [RegisterComponent, PersonalRegisterComponent, SupplementaryRegisterComponent, EcclesiasticalRegisterComponent],
  providers: [GetAddressService, RegisterService],
})
export class RegisterModule {}
