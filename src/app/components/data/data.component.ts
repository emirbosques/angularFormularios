import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  public formValidation : FormGroup;


  // Obj usuario
  usuario:any={
    nombrecompleto:{
      name:'',
      apellido:''
    },
    correo:'',
    pasatiempos: []
  };


  constructor() { 

    this.formValidation = new FormGroup({

      'nombrecompleto': new FormGroup({
        'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('', [Validators.required, Validators.minLength(5)]),
      }),
      'correo': new FormControl('', [Validators.required, Validators.email, 
                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),

      'pasatiempos': new FormArray([ 
        new FormControl('CINE', Validators.required)
      ])
    });

  }

  ngOnInit() {
    /**
     * Instruccion para setear valores por default en el formulario
     * el objeto deberia tener la misma estructura definida en la validacion FormGroup
     */
    // this.formValidation.setValue();
  }

  addPasatiempo(){
    (<FormArray>this.formValidation.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }

  saveChanges(){
    console.log( ' Saving changes ', this.formValidation.value);
    console.log( ' Form Control ', this.formValidation);

    
    /**
     * Instruccion para limpiar valores en el formulario y volver al estado inicial de la validacion
     * el objeto deberia tener la misma estructura definida en la validacion FormGroup
     */
    /* this.formValidation.reset(this.usuarioReset);*/
    
  }

}  