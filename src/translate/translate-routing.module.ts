import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from '../auth/registration/registration.component';
import {TranslateComponent} from './translate/translate.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TranslateComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslateRoutingModule {
}
