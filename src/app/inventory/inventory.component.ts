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
import { finalize, Subject, takeUntil } from 'rxjs';

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
  totalInStock = 0;
  totalOutStock = 0;
  isLoading = true;
  readonly statusIn= 'in_stock';
  readonly statusOut= 'out_of_stock';
  fromDate = new Date();
  toDate = new Date();
  readonly columnTitles = [
   {title:'STT',class:'text-center text-black-alpha-90',classHeader:'w-1', field: 'index'}
  ,{title:'Supplies Name',class:'text-left text-black-alpha-90',classHeader:'w-2',field:'medicineName'}
  ,{title:'Quantity',class:'text-center text-indigo-600',classHeader:'w-1',field:'quantity'}
  ,{title:'Location',class:'text-left text-indigo-600',classHeader:'w-1',field:'location'}
  ,{title:'Expired Date',class:'text-center text-indigo-600',classHeader:'w-1',field:'expiryDate'}
  ,{title:'Supplier',class:'text-left text-indigo-600',classHeader:'w-1',field:'supplier'}
  ,{title:'Goods Received Date',class:' text-center text-indigo-600',classHeader:'w-2',field:'receivedDate'}
  ,{title:'Status',class:'text-center pl-5 pr-5',classHeader:'w-1',field:'status'}
  ,{title:'Action',class:'text-center pl-5 pr-5',classHeader:'w-1',field:'action'}
  ,{title:'Description',class:' text-center text-indigo-600',classHeader:'w-1',field:'description'}
 ];

private destroy$ = new Subject<void>();

  constructor(
          private inventoryService: InventoryService,
          private fb: FormBuilder,
          private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.inventoryService.listen().pipe(takeUntil(this.destroy$)).subscribe((m:any) =>{
      this.getData();
    }); 
    this.getData();
  }

  getData(){
    const params = {
          fromDate: StringUtil.formatDate(this.fromDate,'-'),
          toDate:StringUtil.formatDate(this.toDate,'-')
    }
    this.inventoryService.getInventoryData(params).pipe(takeUntil(this.destroy$),finalize(() => {
      setTimeout(() => {
        this.isLoading = false;
      },500);
      
    })).subscribe(({data}) => {
      this.supplies = data;
      this.filterSupplies = this.supplies.map(item => ({
          ...item,
          receivedDate: formatDate(item.createdAt, environment.DATE_FORMAT_COMMON, 'en-US')
        }));;
      this.summarySupplies = this.supplies.filter(item => item.id === null);
    });
  }

  private countNumberStockInOut(status: string,data:MedicalSupply[] ){
    return data.filter(item => item.status == status && item.id != null).length;
  }

  private countTotalStockInOut(status: string,data:MedicalSupply[] ){

  
    
    return data.filter(item => item.status == status && item.id == null).reduce((total,item) => total + item.totalQuantity,0);
  }

  private setCountInOut(data:MedicalSupply[] ){
    this.inStock       = this.countNumberStockInOut(this.statusIn,data);
    this.outStock      = this.countNumberStockInOut(this.statusOut,data);
  }

  private setTotalInOut(data:MedicalSupply[] ){
    this.totalInStock  = this.countTotalStockInOut(this.statusIn, data);
    this.totalOutStock = this.countTotalStockInOut(this.statusOut, data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.isLoading = true;
    this.getData();
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

  onTableFilter(e: any){
    this.setCountInOut(((e.filteredValue ?? this.filterSupplies)as MedicalSupply[]).filter(item => item.id != null));
    this.setTotalInOut(((e.filteredValue ?? this.filterSupplies)as MedicalSupply[]).filter(item => item.id == null));
  }

}
