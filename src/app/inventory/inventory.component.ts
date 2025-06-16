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
  filterSupplies: MedicalSupply[] = [];
  summarySupplies: MedicalSupply[] = [];
  
  form!: FormGroup;
  displayDialog = false;
  searchText = "";
  row = 10;
  ref !: DynamicDialogRef;
  srcImage = environment.SRC_IMAGE;
  inStock = 0;
  outStock = 0;
  readonly columnTitles = [
   {title:'STT',class:'text-center text-black-alpha-90',classHeader:'w-1', field: 'index'}
  ,{title:'Supplies Name',class:'text-left text-black-alpha-90',classHeader:'w-2',field:'medicineName'}
  ,{title:'Quantity',class:'text-center text-indigo-600',classHeader:'w-1',field:'quantity'}
  ,{title:'Location',class:'text-left text-indigo-600',classHeader:'w-1',field:'location'}
  ,{title:'Expired Date',class:'text-center text-indigo-600',classHeader:'w-2',field:'expiryDate'}
  ,{title:'Supplier',class:'text-left text-indigo-600',classHeader:'w-1',field:'supplier'}
  ,{title:'Goods Received Date',class:' text-center text-indigo-600',classHeader:'w-2',field:'receivedDate'}
  ,{title:'Status',class:'text-center pl-5 pr-5',classHeader:'w-1',field:'status'}
  ,{title:'Action',class:'text-center pl-5 pr-5',classHeader:'w-1',field:'action'}
 ];
  constructor(
          private inventoryService: InventoryService,
          private fb: FormBuilder,
          private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.inventoryService.listen().subscribe((m:any) =>{
      this.getData();
    }); 
    this.getData();
  }

  getData(){
    this.inventoryService.getInventoryData().subscribe(({data}) => {
      this.supplies = data;
      this.filterSupplies = this.supplies.map(item => ({
          ...item,
          receivedDate: formatDate(item.createdAt, environment.DATE_FORMAT_COMMON, 'en-US')
        }));;
      this.summarySupplies = this.supplies.filter(item => item.id === null);
      this.inStock = this.summarySupplies.filter(item => item.status == 'in_stock').length;
      this.outStock = this.summarySupplies.filter(item => item.status == 'out_of_stock').length;
    });
  }

  ngOnDestroy(): void {
    
  }

  show(data: any){
    data.isUpdate = true;
    this.ref = this.dialogService.open(ForminventoryComponent,{
      data:data,
      width:TITLE.INVENTORY.WIDTH,
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

  search(dt1: any){
    if (this.searchText.trim() === '') {
      this.filterSupplies = this.supplies;
      this.summarySupplies = this.supplies.filter(item => item.id === null);
    } else {
      this.filterSupplies = this.supplies.filter(item => 
        item.medicineName?.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.summarySupplies = this.supplies.filter(item => item.id === null && item.medicineName?.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    this.inStock = this.summarySupplies.filter(item => item.status == 'in_stock').length;
    this.outStock = this.summarySupplies.filter(item => item.status == 'out_of_stock').length;
    dt1.first = 0;
    
  }

  searchResult(e:KeyboardEvent,dt1:any){
    if (e.key === 'Enter') {
      this.search(dt1);
    }
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
