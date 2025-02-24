import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupppliesService } from '../suppplies.service';
import MedicalSupplies from '../MedicalSupplies';

@Component({
  selector: 'app-formsupplies',
  templateUrl: './formsupplies.component.html',
  styleUrl: './formsupplies.component.scss'
})
export class FormsuppliesComponent implements OnInit {

  file: any;

  constructor(private suppliesService: SupppliesService){}

  suppliesForm !: FormGroup;

  ngOnInit(): void {
    this.suppliesForm = new FormGroup({
      medicineName: new FormControl('',Validators.required),
      quantity: new FormControl('',Validators.required),
      unitPrice: new FormControl('1', Validators.required)
    });
  }

  addsupplies(){
    console.log('file', this.file);
    
    this.suppliesService.upload(this.file).subscribe({
      next: response => {
        console.log('Tệp đã được tải lên thành công:', response);
       
      },
      error: err => {
        console.error('Lỗi khi tải tệp lên:', err);
      }
    })

    let medicalSupplies: MedicalSupplies = {

      id:0,
      medicineName: this.f['medicineName'].value,
      quantity: this.f['quantity'].value,
      unitPrice: this.f['unitPrice'].value,
      link: this.file.name
    }
    this.suppliesService.add(medicalSupplies).subscribe({
      next: data => {
        console.log(data);
        
      }
    });
  }

  onUpload(e: any){
    this.file = e.files[0];
  }

  get f(){return this.suppliesForm.controls};

}
