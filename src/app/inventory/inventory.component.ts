import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MedicalSupply } from './medical-supply';
import { InventoryService } from './inventory.service';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant, { TITLE } from '../common/constants/CommonConstant';
import { formatDate } from '@angular/common';
import { environment } from '../../environments/environment';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ForminventoryComponent } from './forminventory/forminventory.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [MessageService]
})
export class InventoryComponent implements OnInit, OnDestroy {
  supplies: MedicalSupply[] = [];
  form!: FormGroup;
  displayDialog = false;
  searchText = "";
  row = 10;
  ref !: DynamicDialogRef;
  readonly columnTitles = [
   {title:'STT',class:'text-center text-black-alpha-90',classHeader:'w-1', field: 'index'}
  ,{title:'Supplies Name',class:'text-left text-black-alpha-90',classHeader:'w-2',field:'medicineName'}
  ,{title:'Quantity',class:'text-center text-indigo-600',classHeader:'w-1',field:'quantity'}
  ,{title:'Expired Date',class:'text-center text-indigo-600',classHeader:'w-2',field:'expiryDate'}
  ,{title:'Supplier',class:'text-left text-indigo-600',classHeader:'w-2',field:'supplier'}
  ,{title:'Goods Received Date',class:' text-center text-indigo-600',classHeader:'w-2',field:'receivedDate'}
  ,{title:'Status',class:'text-center pl-5 pr-5',classHeader:'w-1',field:'status'}
  ,{title:'Action',class:'text-center pl-5 pr-5',classHeader:'w-1',field:'action'}
 ];
  constructor(
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {

    this.inventoryService.getInventoryData().subscribe(({data}) => {
      this.supplies = data;
      this.supplies.map(item => {
        item.receivedDate = formatDate(item.createdAt,environment.DATE_FORMAT,'en-US');
      });
    });
  }

  ngOnDestroy(): void {
    
  }

  save() {
    if (this.form.valid) {
      //this.inventoryService.addSupply(this.form.value);
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã thêm vật tư' });
      this.displayDialog = false;
    }
  }

  show(data: any){
    this.ref = this.dialogService.open(ForminventoryComponent,{
      data:data,
      width:TITLE.INVENTORY.WIDTH,
      height: TITLE.INVENTORY.HEIGHT,
      header: TITLE.INVENTORY.TITLE,
      showHeader: false
    });
  }

  add(){
    this.ref = this.dialogService.open(ForminventoryComponent,{
      data:{},
      width:TITLE.INVENTORY.WIDTH,
      header: TITLE.INVENTORY.TITLE,
      showHeader: false
    });
  }
}
