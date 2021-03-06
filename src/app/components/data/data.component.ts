import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';


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
    username: '',
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
      // Validacion Asyncrona
      'username': new FormControl('', Validators.required, this.checkUser.bind(this)) ,

      'passw1': new FormControl('', Validators.required),
      'passw2': new FormControl()
    });

    /**
     * Se aplica el BIND en la funcion noSamePassw
     * Ya que dentro de la misma el THIS esta fuera del scope
     * y con esto se crea el vinculo para leer el dato y hacer la validacion.  
     */    
    this.formValidation.controls['passw2'].setValidators([
      Validators.required, 
      this.noSamePassw.bind(this.formValidation)
    ]);


    /**
     * Escucha de cambios en TODOS los campos del Formulario
     */
    this.formValidation.valueChanges.subscribe(data=>{
      console.log('1-Deteccion values changes in Full Form:',data);
    });

    /**
     * Escucha de cambios en un CAMPO ESPECIFICO en el Formulario
     */
    this.formValidation.controls['username'].valueChanges.subscribe(data=>{
      console.log('2-Deteccion values changes CAMPO ESPECIFICO in Form:',data);
    });

    /**
     * Escucha de cambios de STATUS en el Formulario
     */
    this.formValidation.statusChanges.subscribe(data=>{
      console.log('3-Deteccion STATUS changes in Full Form:',data);
    });

    /**
     * Escucha de cambios de STATUS en un CAMPO ESPECIFICO del Formulario
     */
    this.formValidation.controls['username'].statusChanges.subscribe(data=>{
      console.log('4-Deteccion STATUS changes CAMPO ESPECIFICO in Form:',data);
    });


  }

  ngOnInit() {
    /**
     * Instruccion para setear valores por default en el formulario
     * el objeto deberia tener la misma estructura definida en la validacion FormGroup
     */
    // this.formValidation.setValue();
  }
  
  /**
   *  FUNCION PARA VALIDACION ASYNCRONA
   * @param control 
   */ 
  checkUser(control : FormControl): Promise<any>|Observable<any>{
    let promise = new Promise((resolve, reject)=>{
      setTimeout(() => {
        if(control.value === 'goku'){
          resolve( {exists:true} )
        }else{
          resolve( null );
        }
      }, 1500);
    });
    return promise;
  }


  /**
   * Funcion para validacion personalizada.
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