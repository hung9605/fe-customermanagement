import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MoneyService } from '../money.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import StringUtil from '../../common/utils/StringUtils';
import { environment } from '../../../environments/environment';
import CommonConstant from '../../common/constants/CommonConstant';
import Message from '../../common/constants/Message';

@Component({
  selector: 'app-moneyform',
  templateUrl: './moneyform.component.html',
  styleUrl: './moneyform.component.scss'
})
export class MoneyformComponent implements OnInit,OnDestroy {

  sMoneyForm!: FormGroup;
  isUpdate: boolean = true;
  dataDialog !: any;
  suppliesList !: any;
  row = 10;
  srcImage = environment.SRC_IMAGE;
  columnTitles = [
    {title:'STT',style:'w-1'}
    ,{title:'Medicine Name',style:'w-3'}
    ,{title:'Quantity',style:'w-2'}
    ,{title:'Unit Price',style:'w-2'}
  ];
  isFormChanged: any;

  constructor(
                private dialogConfig:DynamicDialogConfig,
                private moneyService:MoneyService,
                private messageService:MessageService,
                private dialogRef:DynamicDialogRef,
                private router: Router){

  }

  ngOnInit(): void {

    this.dataDialog = this.dialogConfig.data;
        console.log('data money', this.dataDialog);
        
        this.sMoneyForm = new FormGroup({
          id: new FormControl(this.dataDialog.idexam),
          fullName: new FormControl(this.dataDialog.fullName),
          dayOfExamination: new FormControl(this.dataDialog.dateExam),
          status: new FormControl(this.dataDialog.status),
          totalMoney: new FormControl(StringUtil.formatCurrency(this.dataDialog.totalMoney))
        });

        this.sMoneyForm.valueChanges.subscribe(() => {
          this.isFormChanged = this.sMoneyForm.dirty; // Kiểm tra form có thay đổi hay không
        });

        let sExam = {
          id: this.dataDialog.idExam
        }

        this.moneyService.getListSupplies(sExam).subscribe({
          next: data =>{
            this.suppliesList = data.data
            console.log('this.suppliesList', this.suppliesList);
            
          },
          error: err =>{console.log(err);
          }
        })
    
  }

  ngOnDestroy(): void {
    
  }

  edit(){
    this.isUpdate = false;
  }

  save(){

    if(this.isFormChanged){

    }else{
       this.messageService.add({severity:CommonConstant.ERROR,summary:CommonConstant.ERROR_TITLE,detail:Message.DATA_NOT_CHANGE});
    }

  }

  close(){
    this.dialogRef.close();
  }

  // Getter for convenience
  get moneyControl() {
    return this.sMoneyForm.get('money');
  }

}
