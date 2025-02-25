import { Component, OnInit } from '@angular/core';
import MedicalSupplies from '../medicalexamv1/medicalsupplies';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupppliesService } from './suppplies.service';
import StringUtil from '../common/utils/StringUtils';
import { environment } from '../../environments/environment';
import { STATUS_TEXT } from '../common/constants/CommonConstant';

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
  urlImage: string = environment.URL_IMAGE;
  status = STATUS_TEXT;
  columnTitles = [{title:'STT',style:'w-1'},{title:'Medicine Name',style:'w-2'},{title:'Image',style:'w-2'}
    ,{title:'Quantity',style:'w-1'},{title:'Unit Price',style:'w-2'},{title:'Status',style:'w-2'},{title:'Action',style:'w-2'}];

  constructor(private suppliesService: SupppliesService
              ,private dialogService: DialogService){
    }

    ngOnInit(): void {
      this.isLoading = true;
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
            //console.log('this.filteredCustomers',this.filteredCustomers);
            
            setTimeout(() =>{
              this.isLoading = false;
            },500)
    
          },
          error: err => {
            console.log('err',err);
            this.isLoading = false;
            
          }
        })
      }

  show(item: any){

  }

  search(dt1: any) {
    console.log('searchText', this.searchText);
    
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
}
