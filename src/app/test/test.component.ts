import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  inputFields: any[] = [{ value: '' }];  // Initial field with one input

  // Method to add a new input field
  addInputField() {
    this.inputFields.push({ value: '' });
    console.log(this.inputFields);
  }

}
