import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formsupplies',
  templateUrl: './formsupplies.component.html',
  styleUrl: './formsupplies.component.scss'
})
export class FormsuppliesComponent implements OnInit {

  suppliesForm !: FormGroup;

  ngOnInit(): void {
    this.suppliesForm = new FormGroup({
      medicineName: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
      unitPrice: new FormControl('1', Validators.required)
    });
  }

  addsupplies(){

  }

  onUpload(e: any){
    console.log('event', e);
    
  }

}
