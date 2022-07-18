import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Language} from '../models/language.model';
import {TranslateService} from '../translate.service';
import {finalize} from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {
  translateForm: FormGroup;
  languages: Language[];
  isLoading: boolean;

  constructor(private translateSrv: TranslateService, private authSrv: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    authSrv.initUser();
    this.translateForm = new FormGroup({
      source: new FormControl('en', Validators.required),
      target: new FormControl('de', Validators.required),
      q: new FormControl('apple juice', Validators.required),
      translatedText: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.translateSrv.getLanguages()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(languages => this.languages = languages, () => {
        this.openSnackBar('Something went wrong!', 'Dismiss');
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  translate() {
    if (!this.authSrv.isRegistered() && this.authSrv.usage === 3) {
      this.router.navigateByUrl('/registration');
      return;
    }
    const source = this.translateForm.controls.source.value;
    const target = this.translateForm.controls.target.value;
    const q = this.translateForm.controls.q.value;

    this.isLoading = true;
    const request = this.translateSrv.translate(source, target, q)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        this.authSrv.updateUsage();
        this.translateForm.controls.translatedText.setValue(response);
      }, () => {
        this.openSnackBar('Something went wrong!', 'Dismiss');
      });
  }

  swapLanguages() {
    const source = this.translateForm.controls.source.value;
    const target = this.translateForm.controls.target.value;

    this.translateForm.controls.source.setValue(target);
    this.translateForm.controls.target.setValue(source);
  }

  private languageDetected(response) {
    if (response.confidence === 0) {
      this.openSnackBar('Language not recognized!', 'Dismiss');
    } else {
      const languageEl = this.languages.find(language => language.code === response.language);
      this.translateForm.controls.source.setValue(languageEl.code);
      this.openSnackBar(`${languageEl.name} language recognized!`, 'OK');
    }
  }

  detectLanguage() {
    const q = this.translateForm.controls.q.value;
    this.isLoading = false;

    const request = this.translateSrv.detect(q)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((response) => {
        this.languageDetected(response);
      }, () => {
        this.openSnackBar('Something went wrong!', 'Dismiss');
      });
  }
}
