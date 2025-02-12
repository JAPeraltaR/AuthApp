import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'auth-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

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
    console.log( this.myForm.value );

  }
}
