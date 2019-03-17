import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  public usuario = {
    name: null,
    apellido: null,
    email: null
  };

  constructor() { }

  ngOnInit() {
  }

  saveData(form : NgForm){
    console.log('Form Saved', form);
  }

}
