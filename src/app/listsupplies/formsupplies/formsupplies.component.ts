import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupppliesService } from '../suppplies.service';

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
    this.suppliesService.upload(this.file).subscribe({
      next: response => {
        console.log('Tệp đã được tải lên thành công:', response);
      },
      error: err => {
        console.error('Lỗi khi tải tệp lên:', err);
      }
    })
  }

  onUpload(e: any){
    
    this.file = e.files[0];


   
    
  }

}
