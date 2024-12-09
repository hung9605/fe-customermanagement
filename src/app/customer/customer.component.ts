import { Component, OnInit } from '@angular/core';
import CustomerDto from './customerDto';
import { CustomerService } from './customer.service';
import StringUtil from '../common/utils/StringUtils';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{
  customers!: CustomerDto[];
  page!: number;
  row = environment.rowPanigator;
  constructor(private customerService: CustomerService){
    
  }

  ngOnInit(): void {
    this.page = 0;
    this.list(this.page);
  }

  list(page: number){
    this.customerService.getList(page).subscribe({
      next: data => {
        console.log(data);
        
        this.customers = data.data;
        this.customers.map(item =>{
          let nameFormat = item.firstName + " " + item.midName + " " + item.lastName;
          item.fullName = StringUtil.capitalizeFirstLetter(nameFormat ?? "");
          let statusAcconut = item.status == '0' ? 'Active':'Disable';
          item.status = statusAcconut;
        })
      },
      error: err =>{

      }
    });

  }

  show(item: CustomerDto){

  }


}
