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
