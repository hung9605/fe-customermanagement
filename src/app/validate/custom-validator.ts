import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validateLength(length: number): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value && control.value.length !== length) {
          return { lengthError: `Length must be exactly ${length} characters.` };
        }
        return null; // Nếu không có lỗi, trả về null
      };

}

export function onlyLettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    // Kiểm tra nếu giá trị không phải là chữ cái
    const valid = /^[A-Za-z ]+$/.test(value);
    
    // Nếu không phải chữ cái, trả về lỗi
    return valid ? null : { onlyLetters: 'Only letters are allowed' };
  }
}