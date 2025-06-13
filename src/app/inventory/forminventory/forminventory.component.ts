import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { SupppliesService } from '../../listsupplies/suppplies.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import StringUtil from '../../common/utils/StringUtils';
import MedicalSupplies from '../../listsupplies/MedicalSupplies';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import CommonConstant from '../../common/constants/CommonConstant';

@Component({
  selector: 'app-forminventory',
  templateUrl: './forminventory.component.html',
  styleUrl: './forminventory.component.scss'
})
export class ForminventoryComponent implements OnInit, OnDestroy{

  srcImage = environment.SRC_IMAGE;
  inventoryForm !: FormGroup;
  medicalSupplies : MedicalSupplies[] = []
  statusList !: [];
  locationList !: [];
  suppliesItem !: any;
  isSave = true;
  constructor(private fb: FormBuilder,
              private inventoryService: InventoryService,
              private suppliesService: SupppliesService,
              private ref:DynamicDialogRef,
              private messageService: MessageService
  ){

  }

  ngOnInit(): void {
    this.messageService.add({ severity: 'info', summary: 'Toast test', detail: 'Toast is working' });

    this.formInit();
    this.getDataCombo();
  }

  private getDataCombo(){
    this.suppliesService.list({page:0}).subscribe({
      next: ({data}) => {
        this.medicalSupplies = data;
        console.log('this.medicalSupplies',this.medicalSupplies);
        
      }
    })

    this.inventoryService.getStatusCombo().subscribe({
      next: ({data}) => {
        this.statusList = data.status;
        this.locationList = data.location;
      }
    })
  }

  private formInit(){
    this.inventoryForm = this.fb.group({
      medicineName: ['',Validators.required],
      unitPrice: [''],
      quantity: ['', Validators.required],
      location: [''],
      status: [''],
      receivedDate: [''],
      createdBy:[''],
      updateAt: [''],
      updateBy: [''],
      createdAt:['']
    })

  }

  ngOnDestroy(): void {
    
  }

  cancel(){
    this.ref.close();
  }

  closeDialog(){

  }

  add(){
    //const item = this.medicalSupplies.find(item =>  item.medicineName == this.f['medicineName'].value); 
    this.isSave = false;
    const inventoryData = {
            id: null,
            medicalSupplies:this.suppliesItem,
            quantity: this.f['quantity'].value,
            location: this.f['location'].value.valueData,
            status: this.f['status'].value.valueData
    };   
    this.inventoryService.addInventory(inventoryData).pipe(
      finalize(() => {
        this.isSave = true; // Chạy dù success hay error
        
      })
    ).subscribe({
      next: ({data}) => {
        this.messageService.add({severity:CommonConstant.SUCCESS, summary:CommonConstant.SUCCESS_TITLE,detail:CommonConstant.SAVE_SUCCESS});
        setTimeout(() => {
          this.ref.close();
        }, 500);
      },
      error: err => {
        console.log(err);
        this.messageService.add({severity:CommonConstant.ERROR, summary:CommonConstant.ERROR_TITLE,detail:err?.message});
      } 
    })

  }

  get f() {
    return this.inventoryForm.controls;
  }
  

  onMedicineChange(event: any) {
    this.suppliesItem = event.value;
    this.inventoryForm.patchValue({
      unitPrice:  StringUtil.formatCurrency(event.value.unitPrice)
    })
  }

}
