import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../inventory.service';
import { SupppliesService } from '../../listsupplies/suppplies.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import StringUtil from '../../common/utils/StringUtils';
import MedicalSupplies from '../../listsupplies/MedicalSupplies';
import { finalize, forkJoin, Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import CommonConstant from '../../common/constants/CommonConstant';
import { Message } from '../../common/constants/Message';

@Component({
  selector: 'app-forminventory',
  templateUrl: './forminventory.component.html',
  styleUrl: './forminventory.component.scss'
})
export class ForminventoryComponent implements OnInit, OnDestroy{

  srcImage = environment.SRC_IMAGE;
  inventoryForm !: FormGroup;
  medicalSupplies : MedicalSupplies[] = []
  statusList : ComboOption[]=[];
  locationList : ComboOption[]=[];
  selectedSupplies !: any;
  isSave = true;
  private destroy$ = new Subject<void>();
  dataDialog!: any;
  isUpdate = false;
  isEdit = false;
  constructor(private fb: FormBuilder,
              private inventoryService: InventoryService,
              private suppliesService: SupppliesService,
              private ref:DynamicDialogRef,
              private messageService:MessageService,
              private dialogConfig:DynamicDialogConfig,
  ){
  }

  ngOnInit(): void {
    this.dataDialog =this.dialogConfig.data;
    console.log('dataDialog',this.dataDialog);
    this.getDataCombo();
  }

  private getDataCombo(){
    forkJoin({
    supplies: this.suppliesService.list({ page: 0 }),
    statusCombo: this.inventoryService.getStatusCombo()
  }).subscribe({
    next: ({ supplies, statusCombo }) => {
      this.medicalSupplies = supplies.data;
      this.statusList = statusCombo.data.status;
      this.locationList = statusCombo.data.location;
      this.formInit(); 
    }
  });
  }

  private formInit(){
    const{
      isUpdate,
      medicineName,
      unitPrice,
      quantity,
      location,
      status,
      receivedDate,
      createdBy,    
      updateAt,
      updateBy,
      createdAt
    } = this.dataDialog; 
    this.isUpdate= isUpdate;
    this.isEdit = isUpdate;
    const medicalSelect = this.medicalSupplies.find(item => item.medicineName == medicineName);
    if(isUpdate){
      this.selectedSupplies = medicalSelect
    };
    const statusSelect = this.statusList.find(item => item?.valueData == status);
    const locationSelect = this.locationList.find(item => item?.valueData == location);
    console.log('statusSelect',this.statusList);
    console.log('status',status);
    this.inventoryForm = this.fb.group({
      medicineName: [{value:medicalSelect,disabled: this.isUpdate},Validators.required],
      unitPrice: [{value:unitPrice,disabled: this.isUpdate}],
      quantity: [{value:quantity,disabled: this.isUpdate}, Validators.required],
      location: [{value:locationSelect,disabled: this.isUpdate}],
      status: [{value:statusSelect,disabled: this.isUpdate}],
      receivedDate: [receivedDate],
      createdBy:[createdBy],
      updateAt: [updateAt],
      updateBy: [updateBy],
      createdAt:[createdAt]
    })

    console.log(this.inventoryForm.value);
    

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel(){
    this.ref.close();
  }

  closeDialog(){
    this.ref.close();
  }

  add(){
    if (this.inventoryForm.invalid){
      this.messageService.add({severity:CommonConstant.ERROR, summary:CommonConstant.ERROR_TITLE,detail:Message.VALIDATION.FIELD_NOT_BLANK});
      return;
    } 

    if(!this.inventoryForm.dirty) {
      this.messageService.add({severity:CommonConstant.ERROR, summary:CommonConstant.ERROR_TITLE,detail:Message.VALIDATION.DATA_NOT_CHANGE});
      return;
    }

    this.isSave = false;
    const inventoryData = {
            id: this.dataDialog?.id,
            medicalSupplies:this.selectedSupplies,
            quantity: this.f['quantity'].value,
            location: this.f['location'].value?.valueData,
            status: this.f['status'].value?.valueData
    }; 
    console.log('inventoryData',inventoryData);
     
    this.callApi(inventoryData).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.inventoryService.closeDialog();
        this.isSave = true; 
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

  private callApi(inventory: any){
    if(this.isUpdate)
      return this.inventoryService.updateInventory(inventory);
    return this.inventoryService.addInventory(inventory);
  }

  get f() {
    return this.inventoryForm.controls;
  }
  

  onMedicineChange(event: any) {
    this.selectedSupplies = event.value;
    this.inventoryForm.patchValue({
      unitPrice:  StringUtil.formatCurrency(event.value.unitPrice)
    })
  }

  edit(){
    this.isEdit = false;
    this.inventoryForm.get('medicineName')?.enable();
    this.inventoryForm.get('unitPrice')?.enable();
    this.inventoryForm.get('quantity')?.enable();
    this.inventoryForm.get('status')?.enable();
    this.inventoryForm.get('location')?.enable();
  }

}
export interface ComboOption {
  dataKey: string;
  valueData: string;
}