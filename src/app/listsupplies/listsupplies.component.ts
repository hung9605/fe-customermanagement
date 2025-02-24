import { Component, OnInit } from '@angular/core';
import MedicalSupplies from '../medicalexamv1/medicalsupplies';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupppliesService } from './suppplies.service';
import StringUtil from '../common/utils/StringUtils';

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

  constructor(private suppliesService: SupppliesService
      , private dialogService: DialogService
    ){
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

  search(dt1: any){

  }
}
