import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { CurrencyFormatterDirective } from './currency-formatter/currency-formatter.directive';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyInputComponent,
    CurrencyFormatterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
