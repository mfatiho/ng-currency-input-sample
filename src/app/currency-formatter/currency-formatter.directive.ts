import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[currencyFormatter]'
})
export class CurrencyFormatterDirective {

    private el: HTMLInputElement;
    
    @Input()
    private thousandsSeparator = ".";

    constructor(
        private elementRef: ElementRef,
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.el.value = this.transform(this.el.value);
    }

    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        this.el.value = this.parse(value);
    }

    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        this.el.value = this.transform(value);
    }

    transform(value: number | string): string {
        return (value || "").toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    }

    parse(value: string): string {
        return (value || "").replace(new RegExp("\\"+ this.thousandsSeparator, 'g'), "");;
    }
}
