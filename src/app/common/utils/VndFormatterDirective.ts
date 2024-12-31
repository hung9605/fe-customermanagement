import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
    selector: '[appVndFormatter]'
  })
export class VndFormatterDirective{

    constructor(private el: ElementRef) {}

  // Lắng nghe sự kiện khi người dùng thay đổi giá trị
  @HostListener('blur') onBlur() {
    const value = this.el.nativeElement.value;
    // Format giá trị khi người dùng rời khỏi trường input
    this.el.nativeElement.value = this.formatCurrency(value);
  }

  // Lắng nghe sự kiện khi người dùng gõ vào input
  @HostListener('focus') onFocus() {
    const value = this.el.nativeElement.value;
    // Chuyển đổi về dạng số khi người dùng focus
    this.el.nativeElement.value = value.replace(/[^\d]/g, '');
  }

  // Hàm format tiền tệ VND
  private formatCurrency(value: string): string {
    const numberValue = parseFloat(value.replace(/[^\d]/g, ''));
    if (isNaN(numberValue)) {
      return '';
    }

    // Định dạng tiền tệ VND, thêm dấu phẩy ngăn cách hàng nghìn
    return `${numberValue.toLocaleString('vi-VN')}đ`;
  }


}