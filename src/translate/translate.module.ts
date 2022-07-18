import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateComponent } from './translate/translate.component';
import {TranslateRoutingModule} from './translate-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    TranslateComponent
  ],
  imports: [
    CommonModule,
    TranslateRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class TranslateModule { }
