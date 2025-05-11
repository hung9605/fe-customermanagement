import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-registerhistory',
  templateUrl: './registerhistory.component.html',
  styleUrl: './registerhistory.component.scss'
})
export class RegisterhistoryComponent implements OnInit{

    lstRegister!: any[];
    callData: any;
    ref!: DynamicDialogRef;
    date: any = new Date();
    toDate: any = new Date();
    row = environment.rowPanigator;
    isLoading = true;
    columnTitles = [{title:'STT',style:'w-1'},{title:'Full Name',style:'w-4'},
                    {title:'Time Register',style:'w-3'},{title:'Status',style:'w-2'},{title:'Action',style:'w-3'}];

    constructor(){

    }

    ngOnInit(): void {
                      
    }

    search(){

    }

    exportToExcel(){

    }

    show(item: any){
      
    }
}
