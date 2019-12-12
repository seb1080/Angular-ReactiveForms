import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client = new Customer();
  clientForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit():void {
    this.clientForm = this.fb.group({
      firstName: '',
      lastName: ''
    })
  }
}
