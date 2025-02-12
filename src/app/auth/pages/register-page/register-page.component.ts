import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../interfaces';
import { mapObjectToInterface } from '../../util/form.util';
import { Router } from '@angular/router';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'auth-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private authService = inject(AuthService);
  private validatorService = inject(ValidatorService);
  private router =      inject(Router);
  private tf =          inject(FormBuilder);

  public myForm = this.tf.group({
    // name:     ['Jean Andre', [ Validators.required ]],
    // lastName: ['Peralta Rupa', [ Validators.required ]],
    // email:    ['jandrepr6@gmail.com', [ Validators.required, Validators.email ]],
    // tel:      ['', [ Validators.minLength(9) ]],
    // cel:      ['613511873', [ Validators.minLength(9) ]],
    // user:     ['jandrepr6', [ Validators.required ]],
    // pass:     ['Abc1234.', [ Validators.required, Validators.minLength(6) ]]
    name:     ['', [ Validators.required ]],
    lastName: ['', [ Validators.required ]],
    email:    ['', [ Validators.required, Validators.email ]],
    tel:      ['', [ Validators.minLength(9) ]],
    cel:      ['', [ Validators.required, Validators.minLength(9) ]],
    user:     ['', [ Validators.required ]],
    pass:     ['', [ Validators.required, Validators.minLength(8) ]]
  })

  isValidField( field: string ) {
    this.validatorService.isValidForm( this.myForm, field );
  }

  getMessageError( field: string): string | null{
    return this.validatorService.getMessageForm( this.myForm, field);
  }

  register() {
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }


    const register: Register = mapObjectToInterface<Register>(this.myForm.value);
    this.authService.register(register).subscribe({
      next: () => this.router.navigateByUrl('/auth/login'),
      error: (error) => console.log(error)
    });
  }
}
