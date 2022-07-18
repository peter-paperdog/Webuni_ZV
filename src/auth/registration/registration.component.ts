import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      TAC: new FormControl('', [Validators.requiredTrue])
    });
  }

  ngOnInit(): void {
  }

  register() {
    const name = this.registrationForm.controls.name.value;
    const email = this.registrationForm.controls.email.value;
    const phone = this.registrationForm.controls.phone.value;
    this.authService.register(name, email, phone);
    this.router.navigateByUrl('/translate');
  }
}
