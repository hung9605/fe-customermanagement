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
    const valid = /^[\u00C0-\u1EF9\u0110\u0111A-Za-z ]+$/.test(value);
    
    // Nếu không phải chữ cái, trả về lỗi
    return valid ? null : { onlyLetters: 'Only letters are allowed' };
  }
}

export function onlyNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    // Kiểm tra nếu giá trị không phải là số
    const valid = /^[0-9.]+$/.test(value);
    // Nếu không phải số, trả về lỗi
    return valid ? null : { onlyLetters: 'Only number are allowed' };
  }
}