import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
})
export class SwitchesComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    genero: ['F', Validators.required],
    notificaciones: [true, Validators.required],
    condiciones: [false, Validators.requiredTrue],
  });

  persona = {
    genero: 'F',
    notificaciones: true,
  };
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true,
    });

    this.miFormulario.valueChanges.subscribe(({condiciones,...rest})=>{
      this.persona=rest;
    })
  }

  guardar() {
    const formValue = { ...this.miFormulario.value };
    console.log(formValue);
    this.persona=formValue;
  }
}
