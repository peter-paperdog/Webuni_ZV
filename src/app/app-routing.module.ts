import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from '../auth/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/translate',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'translate',
    loadChildren: () => import('./../translate/translate. ').then(m => m.TranslateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
