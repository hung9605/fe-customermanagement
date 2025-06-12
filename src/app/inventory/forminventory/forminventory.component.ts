import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { SupppliesService } from '../../listsupplies/suppplies.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import StringUtil from '../../common/utils/StringUtils';

@Component({
  selector: 'app-forminventory',
  templateUrl: './forminventory.component.html',
  styleUrl: './forminventory.component.scss'
})
export class ForminventoryComponent implements OnInit, OnDestroy{

  srcImage = environment.SRC_IMAGE;
  inventoryForm !: FormGroup;
  medicalSupplies !: [];
  constructor(private fb: FormBuilder,
              private inventoryService: InventoryService,
              private suppliesService: SupppliesService,
              private ref:DynamicDialogRef
  ){

  }

  ngOnInit(): void {
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
  }

  private formInit(){
    this.inventoryForm = this.fb.group({
      medicineName: ['',Validators.required],
      unitPrice: [''],
      quantity: [0, Validators.required],
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

  }

  onMedicineChange(event: any) {
    console.log('Giá trị đã chọn:', event.value);
    this.inventoryForm.patchValue({
      unitPrice:  StringUtil.formatCurrency(event.value.unitPrice)
    })
  }

}
