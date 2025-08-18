import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfigComponent } from '../config/config.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @Input() showhead:boolean = true;
  items = [{label:'tnd'}];
  srcImage = environment.SRC_IMAGE;
  userName: string | null = localStorage.getItem('user_name');
  ref !: DynamicDialogRef;
  ngOnInit(): void {
    
  }

  constructor(private dialogService: DialogService){

  }

  config(){
    this.ref = this.dialogService.open(ConfigComponent,{
      header:'Config',
      width: '40%',
      height: '33%',
      data: {},
      showHeader: false
    });
  }
}
