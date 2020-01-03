import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { CustomerComponent } from "./customers/customer.component";
import { ClientComponent } from "./clients/client.component";

@NgModule({
  declarations: [AppComponent, ClientComponent, CustomerComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
