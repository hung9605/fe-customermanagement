import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ScheduleserviceService } from './scheduleservice.service';
import { MessageService } from 'primeng/api';
import { CustomerService } from '../register/customerservice.service';
import { CustomerService as CustomerHisService } from '../customer/customer.service';
import { Medicalexamv1Component } from '../medicalexamv1/medicalexamv1.component';
import { environment } from '../../environments/environment';
import HistoryDto from '../customer/customermedicalhistory/historyDto';
import { HistorycustomerService } from '../historycustomer/historycustomer.service';
import { take } from 'rxjs';
import CommonConstant, { TITLE } from '../common/constants/CommonConstant';

@Component({
  selector: 'app-schedulemedical',
  templateUrl: './schedulemedical.component.html',
  styleUrl: './schedulemedical.component.scss'
})
export class SchedulemedicalComponent implements OnInit, OnDestroy, AfterViewInit {

  visible = false;
  isReadOnly = true;
  sMedicalForm !: FormGroup;
  ref !: DynamicDialogRef;
  dataDialog !: any;
  isEdit = true;
  isFormChanged: any;
  row = environment.rowPanigator;
  historyList!: HistoryDto[];
  srcImage = environment.SRC_IMAGE;
  columnTitles = [
    { title: 'STT', style: 'w-1' }
    , { title: 'Full Name', style: 'w-3' }
    , { title: 'Time Register', style: 'w-2' }
    , { title: 'Date Register', style: 'w-2' }
    , { title: 'Action', style: 'w-2' }
  ];
  @ViewChild('fullNameInput') fullNameInput!: ElementRef<HTMLInputElement>;

  constructor(private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private scheduleService: ScheduleserviceService,
    private messageService: MessageService,
    private customerService: CustomerService,
    private historyService: HistorycustomerService,
    private customerservicehis: CustomerHisService,
    private ngZone: NgZone,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {

    this.dataDialog = this.dialogConfig.data;
    console.log('dataDialogapp', this.dataDialog);
    this.isEdit = true;
    this.sMedicalForm = this.fb.group({
      fullName: [this.dataDialog.fullName],
      timeRegister: [this.dataDialog.timeRegister],
      status: [this.dataDialog.status],
      dateRegister: [this.dataDialog.dateRegister],
      phoneNumber: [this.dataDialog.phoneNumber],
      gender: [this.dataDialog.gender]
    });

    this.sMedicalForm.valueChanges.subscribe(() => {
      this.isFormChanged = this.sMedicalForm.dirty; // Kiểm tra form có thay đổi hay không
    });

    this.customerservicehis.getHistoryCustomer({ id: this.dataDialog.idSchedule }).subscribe({
      next: data => { this.historyList = data.data; }
      , error: err => { }
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      this.fullNameInput.nativeElement.focus();
    });
  }

  edit() {
    this.isReadOnly = false;
    this.visible = true;
    this.isEdit = false;
  }

  saveEdit() {
    if (!this.isFormChanged) {
      this.messageService.add({
        severity: CommonConstant.ERROR,
        summary: CommonConstant.ERROR_TITLE,
        detail: 'Data not changed!'
      });
      return;
    }
    const sMedical = this.buildScheduleMedical();
    this.scheduleService.updateScheduleMedical(sMedical).subscribe({
      next: data => {
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'Update SuccessFull' });
        if (this.f['fullName']?.dirty) {
          console.log('-- processing update account');
          const fullName = this.f['fullName'].value;
          const arrName = fullName?.split(" ");
          let firstName = "";
          let midName = "";
          let lastName = "";

          if (null != arrName) {
            firstName = arrName[0];
            lastName = arrName[arrName.length - 1];
            for (let i = 1; i < arrName.length - 1; i++) {
              midName += arrName[i] + " ";
            }

            const sCustomer = {
              firstName: firstName,
              midName: midName,
              lastName: lastName,
              id: this.dataDialog.idSchedule
            }
            this.scheduleService.updateNameCustomer(sCustomer).subscribe({
              next: data => {
                console.log('Update Customer successfully!');

              },
              error: err => {
                console.log('Update Customer error', err);

              }
            })
          }

        }
        this.closeDialogWithDelay();

      },
      error: err => {
        console.log(err);

      }
    })

  }

  private buildScheduleMedical() {
    return {
      fullName: this.f['fullName'].value,
      timeRegister: this.f['timeRegister'].value,
      id: this.dataDialog.id
    };
  }

  cancel() {
    this.dialogRef.close();
  }

  examination() {
    this.dialogRef.close();
    this.dataDialog.isReadOnly = true;
    this.dataDialog.isUpdate = false;
    this.ref = this.dialogService.open(Medicalexamv1Component, {
      header: 'Medical Examination',
      width: '70%',
      data: this.dataDialog
    });
  }

  ngOnDestroy(): void {
    this.visible = false;
  }

  get f() { return this.sMedicalForm.controls; }

  showHistory(obj: any) {
    obj.status = obj.status == 1 ? CommonConstant.EXAMINED : CommonConstant.NO_EXAMINED;
    this.historyService.getDetailCustomer(obj).subscribe({
      next: ({ data }) => {
        if (data) {
          const {
            sympton,
            typeOfMedicine,
            id,
            money,
            totalMoney,
            quantity,
            temperature,
            healthCondition,
            createdAt,
            createdBy,
            timeActual,
            finalOpinion,
            medical
          } = data;

          Object.assign(obj, {
            isReadOnly: true,
            sympton,
            typeOfMedicine,
            idexam: id,
            idSchedule: medical?.id,
            isUpdate: true,
            money,
            totalMoney,
            quantity,
            temperature,
            healthCondition,
            createdAt,
            createdBy,
            timeActual,
            finalOpinion
          });
          this.ref = this.dialogService.open(Medicalexamv1Component, {
            header: TITLE.EXAM.TITLE,
            width: TITLE.EXAM.WIDTH,
            data: obj,
            showHeader: false
          })
        } else {
          this.messageService.add({ severity: 'info', summary: 'Information', detail: 'No examination' });
        }
      }
    })
  }

private closeDialogWithDelay(): void {
  setTimeout(() => {
    this.customerService.closeDialog();
    this.dialogRef.close();
  }, 500);
}

}
