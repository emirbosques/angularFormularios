import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  public formValidation : FormGroup;

  constructor() { 

    this.formValidation = new FormGroup({
      'nombre': new FormControl('Emir'),
      'apellido': new FormControl(),
      'correo': new FormControl()
    });

  }

  ngOnInit() {
  }


  saveChanges(){
    console.log( ' Saving changes ', this.formValidation.value);
    console.log( ' Form Control ', this.formValidation);
  }

}  