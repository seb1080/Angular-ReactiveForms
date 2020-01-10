import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";

import { debounceTime } from "rxjs/operators";

import { Customer } from "./customer";

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get("email");
  const confirmControl = c.get("confirmEmail");
  return emailControl.value === confirmControl.value ? null : { match: true };
}

function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { range: true };
  }
  return null;
}

function ratingRangeCreator(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (
      c.value !== null &&
      (isNaN(c.value) || c.value < min || c.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup; // form model, to bing with HTML
  customer = new Customer(); // data model, to be send to the BE
  emailMessage: string;

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get("addresses");
  }

  private validationMessages = {
    required: "Please enter your email address.",
    email: "Please enter a valid email address."
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();

    this.customerForm
      .get("notification")
      .valueChanges.subscribe(value => this.setNotification(value));

    const emailControl = this.customerForm.get("emailGroup.email");
    emailControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(value => this.setErrorMessage(emailControl));
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: "home",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: ""
    });
  }

  initForm() {
    this.customerForm = this.fb.group({
      firstName: [
        "First Name (required)",
        [Validators.required, Validators.minLength(3)]
      ],
      lastName: [
        "Last Name (required)",
        [Validators.required, Validators.maxLength(50)]
      ],
      emailGroup: this.fb.group(
        {
          email: ["valid@email.com", [Validators.required, Validators.email]],
          confirmEmail: ["", [Validators.required, Validators.email]]
        },
        { validator: emailMatcher }
      ),
      phone: "",
      notification: "email",
      rating: [null, ratingRangeCreator(1, 5)],
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()])
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

  setErrorMessage(c: AbstractControl): void {
    this.emailMessage = "";
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(" ");
    }
  }
}
