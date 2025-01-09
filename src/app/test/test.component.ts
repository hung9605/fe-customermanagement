import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  // inputFields: any[] = [{ value: '' }];  // Initial field with one input

  // // Method to add a new input field
  // addInputField() {
  //   this.inputFields.push({ value: '' });
  //   console.log(this.inputFields);
  // }

  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    // Khởi tạo FormGroup ban đầu với một control
    this.form = this.fb.group({
      inputs: this.fb.array([this.createInput()])
    });
  }

  // Hàm tạo FormControl mới cho mỗi input
  createInput(): FormControl {
    return this.fb.control('', Validators.required);
  }

  // Hàm thêm input mới vào form
  addInput() {
    const inputs = this.form.get('inputs') as any;  // Lấy danh sách inputs
    inputs.push(this.createInput());  // Thêm FormControl mới
  }

  // Hàm lấy giá trị của tất cả các inputs
  get inputControls() {
    return (this.form.get('inputs') as any).controls;
  }

  save(){
    console.log(this.inputControls);
    
  }
}



