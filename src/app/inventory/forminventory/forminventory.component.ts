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
  isLoading = true;
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
  })
  .pipe(
    finalize(() => {
      setTimeout(() => {
        this.isLoading = false;
      },500)
  })
)
  .subscribe({
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
    const inventoryData = this.buildInventoryData();
    console.log('inventoryData',inventoryData);
     
    this.callApi(inventoryData).pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this.inventoryService.closeDialog();
        this.isSave = true; 
      })
    ).subscribe({
      next: ({data}) => this.onSaveSuccess(),
      error: err => this.onSaveError(err)
    })

  }

  private buildInventoryData(): any {
    return {
      id: this.dataDialog?.id,
      medicalSupplies: this.selectedSupplies,
      quantity: this.f['quantity'].value,
      location: this.f['location'].value?.valueData,
      status: this.f['status'].value?.valueData
    };
  }
  
  private onSaveSuccess(): void {
    this.messageService.add({
      severity: CommonConstant.SUCCESS,
      summary: CommonConstant.SUCCESS_TITLE,
      detail: CommonConstant.SAVE_SUCCESS
    });
  
    setTimeout(() => this.ref.close(), 500);
  }
  
  private onSaveError(err: any): void {
    console.error(err);
    this.messageService.add({
      severity: CommonConstant.ERROR,
      summary: CommonConstant.ERROR_TITLE,
      detail: err?.message
    });
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
    const controlsToEnable = ['medicineName', 'unitPrice', 'quantity', 'status', 'location'];
    controlsToEnable.forEach(control => {
      this.inventoryForm.get(control)?.enable();
    });  
  }

getImageName(value: any): string {
  const imageMap: { [key: string]: string } = {
    in_stock: 'instock.png',
    out_of_stock: 'outstock.png',
    expired: 'expired.png',
    low_stock: 'lowstock.png',
    main: 'main.png',
  };

  return imageMap[value?.toLowerCase()] || 'instock.png';
}


}
export interface ComboOption {
  dataKey: string;
  valueData: string;
}