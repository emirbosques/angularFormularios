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
    pasatiempos: [],
    passw1: '',
    passw2: ''
  };


  constructor() { 

    this.formValidation = new FormGroup({

      'nombrecompleto': new FormGroup({
        'name': new FormControl('', [Validators.required, Validators.minLength(3), this.noSameName]),
        'apellido': new FormControl('', [Validators.required, Validators.minLength(5)]),
      }),
      'correo': new FormControl('', [Validators.required, Validators.email, 
                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),

      'pasatiempos': new FormArray([ 
        new FormControl('CINE', Validators.required)
      ]),
      'passw1': new FormControl('', Validators.required),
      'passw2': new FormControl()
    });

    this.formValidation.controls['passw2'].setValidators([
      Validators.required, 
      this.noSamePassw.bind(this.formValidation)
    ]);


  }

  ngOnInit() {
    /**
     * Instruccion para setear valores por default en el formulario
     * el objeto deberia tener la misma estructura definida en la validacion FormGroup
     */
    // this.formValidation.setValue();
  }

  /**
   * Funcion para validacion personalizada.
   * 
   */
  noSameName( control: FormControl ): {[s:string]:boolean} {
    let val: any = control.value;
    if ( val === 'emir'){
      return{
        samename: true
      }
    }
    return null;
  }

  noSamePassw( control: FormControl ): {[s:string]:boolean} {
    let val: any = control.value;
    let forma: any = this;
    
    if ( val !==  forma.controls['passw1'].value ){
      return{
        samename: true
      }
    }
    return null;
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