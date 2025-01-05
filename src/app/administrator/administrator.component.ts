import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidadminComponent } from './validadmin/validadmin.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.scss'
})
export class AdministratorComponent {

  ref!: DynamicDialogRef;

  constructor(private dialogService:DialogService){}

  export(){

    this.ref = this.dialogService.open(ValidadminComponent,{
      header:'Authenticaltion',
      width: '100vh'
    });

  }
  
}
