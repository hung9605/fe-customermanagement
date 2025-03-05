import { Component, OnInit } from '@angular/core';
import MedicalSupplies from '../medicalexamv1/medicalsupplies';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupppliesService } from './suppplies.service';
import StringUtil from '../common/utils/StringUtils';
import { environment } from '../../environments/environment';
import { STATUS_TEXT } from '../common/constants/CommonConstant';
import { FormsuppliesComponent } from './formsupplies/formsupplies.component';
import { SuppliesdetailComponent } from './suppliesdetail/suppliesdetail.component';
import { EditsuppliesformComponent } from './editsuppliesform/editsuppliesform.component';

@Component({
  selector: 'app-listsupplies',
  templateUrl: './listsupplies.component.html',
  styleUrl: './listsupplies.component.scss'
})
export class ListsuppliesComponent implements OnInit{
  sSupplies !: MedicalSupplies[];
  callData: any;
  ref !: DynamicDialogRef; 
  isLoading = true;
  searchText: string = ''; // Search input text
  filteredSupplies: any[] = this.sSupplies; // Filtered list
  urlImage: string = environment.URL_UPLOAD_IMAGE;
  status = STATUS_TEXT;
  columnTitles = [
    {title:'STT',style:'w-1'}
    ,{title:'Medicine Name',style:'w-2'}
    ,{title:'Image',style:'w-2'}
    ,{title:'Quantity',style:'w-1'}
    ,{title:'Unit Price',style:'w-2'}
    ,{title:'Status',style:'w-2'}
    ,{title:'Action',style:'w-2'}
  ];

  constructor(private suppliesService: SupppliesService
              ,private dialogService: DialogService){
    }

    ngOnInit(): void {
      this.isLoading = true;
      this.suppliesService.listen().subscribe((m:any) =>{
        this.loadData();
    });
      this.loadData();
    }

    loadData(){
      let sSupplies = {
         page: 0
      }
        this.suppliesService.list(sSupplies).subscribe({
          next: data => {
            this.sSupplies = data.data;
            this.sSupplies.map(item => {
              item.medicineName = StringUtil.capitalizeFirstLetter(item.medicineName ?? "");
            });
            this.filteredSupplies = this.sSupplies;
            setTimeout(() =>{
              this.isLoading = false;
            },500)
          },
          error: err => {
            this.isLoading = false;
          }
        })
  }

  show(item: any){
    this.ref = this.dialogService.open(SuppliesdetailComponent,{
      header:'Supplies Detail',
      width: '80%',
      height:'100vh',
      data: item
    })
  }

  search(dt1: any) {
      if (this.searchText.trim() === '') {
        // Nếu không có tìm kiếm, hiển thị tất cả dữ liệu
        this.filteredSupplies = this.sSupplies;
      } else {
        // Lọc dữ liệu theo từ khóa tìm kiếm
        this.filteredSupplies = this.sSupplies.filter(supplies => 
          supplies.medicineName?.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
      dt1.first = 0; // Reset pagination to the first page after search
    }
    update(item: any){
      this.ref = this.dialogService.open(EditsuppliesformComponent,{
        data:item,
        width:'60%',
        height: '100vh',
        header: "Update Supplies"
      });
    }

    searchResult(e:KeyboardEvent,dt1:any){
      if (e.key === 'Enter') {
        this.search(dt1);
      }
    }


}