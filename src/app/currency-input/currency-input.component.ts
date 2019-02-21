import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { CurrencyFormatterDirective } from '../currency-formatter/currency-formatter.directive';

@Component({
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.css'],
  providers: [CurrencyFormatterDirective]
})
export class CurrencyInputComponent implements OnInit {

  @Input('model')
  set model(value: number) {
    if (value) {
      const tokens = value.toString().split(this.decimalPoint);
      if (tokens.length > 0)
        this.integerValue = parseInt(tokens[0]);
      if (tokens.length > 1)
        this.decimalValue = parseInt(tokens[1]);
    }
  }

  @Output() modelChange = new EventEmitter();

  @ViewChild('currencyInteger')
  currencyInteger: any;

  @ViewChild('currencyDecimal')
  currencyDecimal: any;

  _integerValue: number;
  get integerValue(): number {
    return this._integerValue;
  }
  set integerValue(value: number) {
    this._integerValue = value;
    this.currencyValue = this.parseCurrencyValue(value, this.decimalValue);
  }

  _decimalValue: number;
  get decimalValue(): number {
    return this._decimalValue;
  }
  set decimalValue(value: number) {
    this._decimalValue = value;
    this.currencyValue = this.parseCurrencyValue(this.integerValue, value);
  }

  _currencyValue: number;
  get currencyValue(): number {
    return this._currencyValue;
  }
  set currencyValue(value: number) {
    this._currencyValue = value;
    this.modelChange.emit(value);
  }

  decimalPoint = ",";

  constructor() { }

  ngOnInit() {
  }

  parseCurrencyValue(intVal: number, decimalVal: number): number {
    return +((intVal ? intVal : 0) + "." + (decimalVal ? decimalVal : 0));
  }

  integerArrowRight(event: any) {
    const relatedPosition = event.srcElement.value.length - event.srcElement.selectionStart;
    if (relatedPosition == 0) {
      this.currencyDecimal.nativeElement.focus();
      setTimeout(() => {
        this.currencyDecimal.nativeElement.selectionStart = 0;
        this.currencyDecimal.nativeElement.selectionEnd = 0;
      }, 0.1);
    }
  }

  decimalArrowLeft(event: any) {
    const position = event.srcElement.selectionStart;
    if (position == 0) {
      this.currencyInteger.nativeElement.focus();
      setTimeout(() => {
        this.currencyInteger.nativeElement.selectionStart = this.currencyInteger.nativeElement.value.length;
        this.currencyInteger.nativeElement.selectionEnd = this.currencyInteger.nativeElement.value.length;
      }, 0.1);
    }
  }

  decimalBackSpace(event: any) {
    const position = event.srcElement.selectionStart;
    if (position == 0) {
      this.currencyInteger.nativeElement.focus();
    }
  }
}
