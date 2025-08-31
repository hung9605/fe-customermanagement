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
  srcImage = environment.SRC_IMAGE;
  userName: string | null = localStorage.getItem('user_name');
  ref !: DynamicDialogRef;
  messages: string[] = [
  "     🎉 Chào mừng bạn đến với hệ thống Health Center 🎉",
  "💡 Khám sức khỏe định kỳ miễn phí vào ngày 15 hàng tháng 💡",
  "            🧑‍⚕️ Hãy giữ gìn sức khỏe và an toàn 🧑‍⚕️"
];

  ngOnInit(): void {
    
  }

  constructor(private dialogService: DialogService){

  }

  config(){
    this.ref = this.dialogService.open(ConfigComponent,{
      header:'Config',
      width: '40%',
      data: {},
      showHeader: false
    });
  }
}
