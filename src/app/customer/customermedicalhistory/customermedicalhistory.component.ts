import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customermedicalhistory',
  templateUrl: './customermedicalhistory.component.html',
  styleUrl: './customermedicalhistory.component.scss'
})
export class CustomermedicalhistoryComponent implements OnInit{
  
      customerForm !: FormGroup;
      dataDialog!: any;
      isReadOnly = true;
      isUpdate = true;
      birthday!: Date;
      name !: string;
      phoneNumber !: string;
      address !: string;
      status !: boolean;

      constructor(private dialogConfig:DynamicDialogConfig,
                    private customerservice:CustomerService,
                    private ref:DynamicDialogRef,
                    private messageService:MessageService,
                    private router: Router
        ){
      
        }
      
        ngOnInit(): void {
          this.isUpdate = true;
          this.dataDialog = this.dialogConfig.data;
          this.name = this.dataDialog.fullName;
          this.phoneNumber = this.dataDialog.phoneNumber;
          this.address = this.dataDialog.address;
          this.status = this.dataDialog.status == '0' ? true: false;
          this.birthday = new Date(this.dataDialog.dateOfBirth);

          let customer = {
            id: 40
          }

          this.customerservice.getHistoryCustomer(customer).subscribe({
            next: data => {console.log(data);}
           ,error: err => {}
          })
        }

        close(){
          this.ref.close();
        }


}