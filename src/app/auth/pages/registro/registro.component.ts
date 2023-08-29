import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import {
  // emailPattern,
  noPuedeSerStrider,
  nombreyApellidoPattern,
} from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
// import { emailPattern } from '../../../shared/validator/validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {
  miFormulario = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreyApellidoPattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.noPuedeSerStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );
  // emailErrorMsg:string='';

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if (errors?.['required']) {
      return 'Email es obligatorio';
    } else if (errors?.['pattern']) {
      return 'El valor ingresado no tiene formato de correo';
    } else if (errors?.['emailTomado']) {
      return 'El email ya fue tomado';
    }

    return '';
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}
  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      username: 'fernando@her_85',
      email: ['test1@test.com'],
      password: '123456',
      password2: '123456',
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

  // emailRequired(){
  //   return (
  //     this.miFormulario.get('email')?.errors?.['required'] &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }

  // emailFormato(){
  //   return (
  //     this.miFormulario.get('email')?.errors?.['pattern'] &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }

  // emailTomado(){
  //   return (
  //     this.miFormulario.get('email')?.errors?.['emailTomado'] &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }
}
