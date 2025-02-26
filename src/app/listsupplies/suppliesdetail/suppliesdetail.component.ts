import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupppliesService } from '../suppplies.service';

@Component({
  selector: 'app-suppliesdetail',
  templateUrl: './suppliesdetail.component.html',
  styleUrl: './suppliesdetail.component.scss'
})
export class SuppliesdetailComponent implements OnInit{

    visible = false;
    isReadOnly = true;
    sSuppliesDetailForm !: FormGroup;
    ref !: DynamicDialogRef;
    dataDialog !: any;
    isEdit = true;
    isFormChanged: any;
    images!: any[];
    responsiveOptions!: any[];

    constructor(private suppliesService: SupppliesService){}

    ngOnInit(): void {
      this.suppliesService.getImages().then((images) => (this.images = images));
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