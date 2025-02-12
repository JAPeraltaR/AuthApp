import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public isValidForm( form: FormGroup, field: string ): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getMessageForm( form: FormGroup, field: string ): string | null {
    if( !form.controls[field] ) return null;
    const errors = form.controls[field].errors || {};
    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido.'
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracters.`;
        case 'email':
          return 'Debe ingresar un email valido.'
      }
    }
    return null;
  }

}
