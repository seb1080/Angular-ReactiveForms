import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Customer } from "./customer";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup; // form model, to bing with HTML
  customer = new Customer(); // data model, to be send to the BE

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: [
        "First Name (required)",
        [Validators.required, Validators.minLength(3)]
      ],
      lastName: [
        "Last Name (required)",
        [Validators.required, Validators.maxLength(50)]
      ],
      email: ["Email (required)", [Validators.required, Validators.email]],
      phone: "",
      notification: "email",
      sendCatalog: true
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

  setNotification(notifiyVia: string): void {
    const phoneControl = this.customerForm.get("phone");
    if (notifiyVia === "text") {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
