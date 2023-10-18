import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginTuyaPage } from './login-tuya.page';

const routes: Routes = [
  {
    path: '',
    component: LoginTuyaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginTuyaPageRoutingModule {}
