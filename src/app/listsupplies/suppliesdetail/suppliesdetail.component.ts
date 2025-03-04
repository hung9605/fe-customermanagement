import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupppliesService } from '../suppplies.service';
import StringUtil from '../../common/utils/StringUtils';

@Component({
  selector: 'app-suppliesdetail',
  templateUrl: './suppliesdetail.component.html',
  styleUrl: './suppliesdetail.component.scss'
})
export class SuppliesdetailComponent implements OnInit{

    visible = false;
    isReadOnly = true;
    ref !: DynamicDialogRef;
    dataDialog !: any;
    isEdit = true;
    isFormChanged: any;
    images!: any[];
    responsiveOptions!: any[];
    medicineName!: string;
    price!: string;
    description: any;
    quantity: any;
    constructor(private suppliesService: SupppliesService
               ,private dialogConfig:DynamicDialogConfig){
    }
    ngOnInit(): void {
      this.dataDialog = this.dialogConfig.data;
      this.medicineName = this.dataDialog.medicineName;
      this.price = StringUtil.formatCurrency(this.dataDialog.unitPrice);
      this.quantity = this.dataDialog.quantity;
      let idSupplies = this.dataDialog.id;
      this.suppliesService.getDetailSupplies(idSupplies).subscribe({
        next: data => {this.description = data.data.description},
        error: err => {console.log(err)}
      });
      this.suppliesService.getImages(idSupplies).subscribe({
        next: data => {
          this.images = data.data;
          this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
      ];

        },
        error: err => {console.log('error: ' + err);
        }
      });
      this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
      ];
    }

    close(){
      
    }

}