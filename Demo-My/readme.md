# Demo-Start: These are the starter files for the Angular Reactive Forms demo form.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---

# Personal Note

## Accessing the Form Model Properties

```js
customerForm.controls.firstName.valid;

customerForm.get("firstName").valid;
```

## Using **setValues** and **patchValue**

```js
// for all values of the form
this.customerForm.setValue({
  firstName: "Seb",
  lastName: "Blais",
  email: "sbf@email.com"
});

// for some values of the form
this.customerForm.patchValue({
  firstName: "Seb",
  lastName: "Blais"
});
```

## Async Validators using FormBuilder

```js
ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ["", Validators.required, Validators.minLength(3), // Async Validators can by use for server side validation
      ],
      lastName: [{ value: "n/a", disabled: true }],
      email: [{ value: "n/a", disabled: true }],
      sendCatalog: [{ value: true, disabled: false }]
    });
  }
```

## Adjusting Validation Rules at Runtime

```js
myControl.setValidators(Validators.required);

myControl.setValidators([Validators.required, Validators.maxLength(30)]);

myControl.clearValidators();

myControl.updateValueAndValidity();
```

```html
<label class="form-check-label">
  <input
    class="form-check-input"
    type="radio"
    value="email"
    formControlName="notification"
    (click)="setNotification('email')"
  />
  Email
</label>
```

```js
setNotification(notifiyVia: string): void {
    const phoneControl = this.customerForm.get("phone");
    if (notifiyVia === "text") {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
```

## Custom Validator

```js
function myValidator(c: AbstactControl): { [Key: string]: boolean } | null {
  if (somethingIsWrong) {
    return { myValidator: true };
  }
  return null;
}
```

## Custom Validator with Parameters

```js
function myValidator(param: any): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (somethingIsWrong) {
      return { myvalidator: true };
    }
    return null;
  };
}
```

## Cross-field Validator: Nested FormGroup

```js
this.customerForm = this.fb.group({
  firstName: [
    "",
    Validators.required,
    Validators.minLength(3) // Async Validators can by use for server side validation
  ],
  lastName: [{ value: "n/a", disabled: true }],
  avaibility: this.fb.group({
    start: ["", Validators.required],
    end: ["", Validators.required]
  })
});
```

## Cross-field Validation: Custom Validator

```js
function dataCompare(c: AbstractControl): {[key:string]: boolean | null {
  let startControl = c.get('start')
  let endControl = c.get('end');
  if (startControl.value !== endControl.value) {
    return { 'match': true };
  }
  retrun null;
}

this.customerForm = this.fb.group({
  firstName: ['', [Validators.required, Validators.minLength(3)]],
  lastName: ['', [Validators.required, Validators.maxLength(50)]],
  avaibility: this.fb.group({
    start: ['', Validators.required],
    end: ['', Validators.required]
  }, { validator: dateCompare })
});
```

## Reacting to Changes

```js
// subscribing to a event then trigger a function on value change
this.customerForm
  .get("notification")
  .valueChanges.subscribe(value => this.setNotification(value));
```

## Reactive Transformations

### debounceTime()

- Ignores events until a specific time has passed without another event.
- debounceTime(1000) waits for 1000 ms of no events before emitting another event

### throttleTime()

- Emits a value, then ignores subsequent values for a specific amount of time.

### distincUnitChanged

- Suppresses duplicate consecutive items

## FromArray

```js
this.myArray = new FormArray([formControl, formGroup]);

this.myArray = this.fb.array([formControl, formGroup]);
```

```html
<div
  formArrayName="addresses"
  *ngFor="let address of addresses.controls; let i=index"
>
  <div [formGroupName]="i"></div>
</div>
```
