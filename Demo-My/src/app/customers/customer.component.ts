import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { Customer } from "./customer";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup; // form model, to bing with HTML
  customer = new Customer(); // data model, to be send to the BE

  constructor() {}

  ngOnInit() {
    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)
    });
  }

  populateTestData(): void {
    
    this.customerForm.patchValue({
      firstName: "default firstName",
      lastName: "default lastName",
      email: "default email"
    });
  }

  save() {
    console.log(this.customerForm);
    console.log("Saved: " + JSON.stringify(this.customerForm.value));
  }
}
