import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppendDegreeCDirective]'
})
export class AppendDegreeCDirectiveDirective {
  private isComposing = false;
  private readonly suffix = ' °C';

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input')
  onInput(): void {
    if (this.isComposing) return;

    const inputEl = this.el.nativeElement;
    let value = inputEl.value;

    // Bỏ hậu tố °C nếu đã có
    if (value.endsWith(this.suffix)) {
      value = value.slice(0, -this.suffix.length).trim();
    }

    // Nếu là số hoặc rỗng thì thêm lại hậu tố
    if (/^\d*\.?\d*$/.test(value)) {
      const cursorPos = inputEl.selectionStart ?? value.length;
      inputEl.value = value + this.suffix;

      // Đặt lại vị trí con trỏ
      inputEl.setSelectionRange(cursorPos, cursorPos);
    }
  }

  @HostListener('compositionstart')
  onCompositionStart() {
    this.isComposing = true;
  }

  @HostListener('compositionend')
  onCompositionEnd() {
    this.isComposing = false;
    this.onInput();
  }

}