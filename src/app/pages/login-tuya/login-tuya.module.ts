import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginTuyaPageRoutingModule } from './login-tuya-routing.module';

import { LoginTuyaPage } from './login-tuya.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginTuyaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginTuyaPage]
})
export class LoginTuyaPageModule {}
