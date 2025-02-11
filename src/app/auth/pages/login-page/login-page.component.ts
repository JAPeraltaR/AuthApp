import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'auth-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private tf          = inject( FormBuilder );
  private router      = inject( Router )
  private authService = inject( AuthService );


  public myForm = this.tf.group({
    email: ['jandrepr4@gmail.com', [ Validators.required,Validators.email ] ],
    pass: ['Abc1234.', [ Validators.required, Validators.minLength(6) ]]
  })

  login() {
    const { email, pass } = this.myForm.value;
    if( typeof(email) === 'string' && typeof(pass) === 'string'){
      this.authService.login( email , pass )
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          Swal.fire('Error', message, 'error');
        }
      });
    }
  }

}
