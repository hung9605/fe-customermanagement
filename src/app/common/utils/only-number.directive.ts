import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]' // tên directive bạn sẽ dùng trong template
})
export class OnlyNumberDirective {

  constructor(private el: ElementRef){}
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Tab', 'Enter', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'
    ];
    const numberCodes = [
      'Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4',
      'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
      'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4',
      'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9'
    ];

    console.log('event.code', numberCodes.includes(event.code));
    
    
    if (numberCodes.includes(event.code) || allowedKeys.includes(event.key)) {
      return;
    }
    event.preventDefault();
  }

    // Xử lý sau khi người dùng đã gõ, kể cả dùng bộ gõ tiếng Việt
    @HostListener('input', ['$event'])
    onInput(event: InputEvent) {
      const inputElement = this.el.nativeElement as HTMLInputElement;
      const filteredValue = inputElement.value.replace(/[^0-9]/g, '');
      if (inputElement.value !== filteredValue) {
        inputElement.value = filteredValue;
        // Nếu bạn dùng ngModel hoặc formControl, cần trigger event để cập nhật giá trị
        inputElement.dispatchEvent(new Event('input'));
      }
    }
}
