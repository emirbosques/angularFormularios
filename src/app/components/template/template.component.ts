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
    email: null,
    pais: '',
    sexo: '',
    conditions:false
  };

  paises = [
    {cod: 'ESP', name: 'ESPAÑA'},
    {cod: 'USA', name: 'ESTADOS UNIDOS'},
    {cod: 'NOR', name: 'NORUEGA'},
    {cod: 'AUT', name: 'AUSTRIA'},
    {cod: 'VEN', name: 'VENEZUELA'},
    {cod: 'MEX', name: 'MEXICO'}
  ];

  sexo = [
    {cod: 'M', name: 'Mujer'},
    {cod: 'H', name: 'Hombre'},
    {cod: 'T', name: 'Transexual'},
    {cod: 'I', name: 'Indefinido'}
  ];


  constructor() { }

  ngOnInit() {
  }

  saveData(form : NgForm){
    console.log('Form Saved', form);
  }

}
