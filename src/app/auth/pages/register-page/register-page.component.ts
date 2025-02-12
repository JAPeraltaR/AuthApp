import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private authService = inject(AuthService);
  private tf = inject(FormBuilder);

  public myForm = this.tf.group({
    name:     ['', [ Validators.required ]],
    lastName: ['', [ Validators.required ]],
    email:    ['', [ Validators.required, Validators.email ]],
    tel:      ['', [ Validators.minLength(9) ]],
    cel:      ['', [ Validators.minLength(9) ]],
    user:     ['', [ Validators.required ]],
    pass:     ['', [ Validators.required, Validators.minLength(6) ]]
  })

  register() {
    this.authService.register();
  }
}
