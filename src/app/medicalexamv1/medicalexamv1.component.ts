import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MedicalService } from './medical.service';
import MedicalSupplies from './medicalsupplies';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant from '../common/constants/CommonConstant';

@Component({
  selector: 'app-medicalexamv1',
  templateUrl: './medicalexamv1.component.html',
  styleUrl: './medicalexamv1.component.scss'
})
export class Medicalexamv1Component implements OnInit, OnDestroy{

  sMedicalExamForm!: FormGroup;
  symptonForm !: FormGroup;
  typeOfMedicineForm !: FormGroup;
  dataDialog!: any;
  isReadOnly = true;
  isUpdate = false;
  sMedicalSupply!: MedicalSupplies[];
  lstPres : any;
  constructor(private dialogConfig:DynamicDialogConfig,
              private medicalServie:MedicalService,
              private ref:DynamicDialogRef,
              private messageService:MessageService,
              private router: Router){
  }

  async ngOnInit() {
    console.log('this.datadialog',this.dialogConfig.data);
    this.dataDialog = this.dialogConfig.data;
    this.isReadOnly = this.dataDialog.isReadOnly;
    this.isUpdate = this.dataDialog.isUpdate;
    this.sMedicalExamForm = new FormGroup({
      id: new FormControl(this.dataDialog.idexam),
      fullName: new FormControl(this.dataDialog.fullName),
      timeRegister: new FormControl(this.dataDialog.timeRegister),
      status: new FormControl(this.dataDialog.status),
      dayOfExamination: new FormControl(this.dataDialog.dateRegister),
      money: new FormControl(this.dataDialog.totalMoney),
    });
    this.symptonForm = new FormGroup({
      symptons: new FormArray([])
    });
    this.typeOfMedicineForm = new FormGroup({
      typeMedicines: new FormArray<FormControl>([]),
      moneys: new FormArray<FormControl>([]),
      quantitys: new FormArray<FormControl>([])
    });
    const data = await this.medicalServie.listMedicalSupplies().toPromise();
    this.sMedicalSupply = data.data;
    const symptonArr = this.symptonForm.get('symptons') as FormArray<FormControl>;
    const moneyArr = this.typeOfMedicineForm.get('moneys') as FormArray<FormControl>;  
    const typeMedicineArr = this.typeOfMedicineForm.get('typeMedicines') as FormArray<FormControl>;
    const quantityArr = this.typeOfMedicineForm.get('quantitys') as FormArray<FormControl>;
    if(this.isUpdate){
    let symptonLst: string[] = this.dataDialog.sympton.split(',');
    let moneyLst: string[] = this.dataDialog.money.split(',');
    let quantityLst: string[] = this.dataDialog.quantity.split(',');
    let typeMedicineLst: string[] = this.dataDialog.typeOfMedicine.split(',');

    symptonLst.forEach((data) =>{
      symptonArr.push(new FormControl(data,Validators.required));
    });
      
    moneyLst.forEach((data) =>{
      moneyArr.push(new FormControl(data,Validators.required));
    });
      
    typeMedicineLst.forEach((data) =>{
      const selectedItem = this.sMedicalSupply.find(item =>  
        item.medicineName == data
      );
      typeMedicineArr.push(new FormControl(selectedItem,Validators.required));
    });
    quantityLst.forEach((data,index) =>{
      let quantity = new FormControl(data,Validators.required);
      quantity.valueChanges.subscribe(value =>{
        this.updateMoney(index,value);
      })
      quantityArr.push(quantity);
    });

    let sExam = {
      id:this.dataDialog.idexam
    }
    this.medicalServie.listPrescription(sExam).subscribe({
      next: data => {
        this.lstPres = data.data;
      }
    })

  }else{
    symptonArr.push(new FormControl('',Validators.required));
    moneyArr.push(new FormControl('',Validators.required));
    typeMedicineArr.push(new FormControl('',Validators.required));

    let quantity = new FormControl(CommonConstant.QUANTITY_DEFAULT,Validators.required);
    quantity.valueChanges.subscribe(value => {
      this.updateMoney(0,value);
    });
    quantityArr.push(quantity);
  } 
  }

  ngOnDestroy(): void {
    this.isReadOnly = true;
  }

  save(){
     if(this.sMedicalExamForm.valid && this.typeOfMedicineForm.valid){
     const values = this.symptons.controls.map(control => control.value);
    let medicalExam = {
      id:this.f['id'].value==null?0:this.f['id'].value,
      fullName: this.f['fullName'].value,
      status: 1,
      sympton: this.symptonsValue,
      typeOfMedicine: this.typeMedicineValue,
      dayOfExamination: this.f['dayOfExamination'].value,
      medical:{
        id:this.dataDialog.id
      },
      money: this.moneysValue,
      totalMoney: this.totalMoney,
      quantity: this.quantitysValue,
      prescription: [],
      createdAt: '',
      createdBy: ''
    }

    if(this.isUpdate){
      medicalExam.createdAt = this.dataDialog.createdAt;
      medicalExam.createdBy = this.dataDialog.createdBy;
      this.medicalServie.updateMedicalExam(medicalExam).subscribe({
        next: data => {
          this.messageService.add({severity:'success', summary:'Success',detail:'Save successfully ' + data.data.fullName});
          setTimeout(() => {
            this.ref.close();
             this.router.navigateByUrl('/',{skipLocationChange:true}).then(() =>{
               this.router.navigate(['/listregister']);
             })
          },500);
        }
      })

    }else{

     this.medicalServie.addMedicalExam(medicalExam).subscribe({
       next: data => {
         this.messageService.add({severity:'success', summary:'Success',detail:'Save successfully ' + data.data.fullName});
         setTimeout(() => {
           this.ref.close();
            this.router.navigateByUrl('/',{skipLocationChange:true}).then(() =>{
              this.router.navigate(['/listregister']);
            })
         },500);
       }
     })
    }
  }else{
    this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Field not blank!'});
  }

  }

  get typeMedicineValue(): string{
    return this.typeMedicines.controls.map(control => control.value.medicineName).join(',');
  }

  get moneysValue(): string{
    return this.moneys.controls.map(control => control.value).join(',');
  }

  get symptonsValue(): string{
    return this.symptons.controls.map(control => control.value).join(',');
  }
  get quantitysValue(): string{
    return this.quantitys.controls.map(control => control.value).join(',');
  }

  close(){
    this.ref.close();
  }

  get f(){return this.sMedicalExamForm.controls;}

  edit(){
    this.isReadOnly = false;
  }

  get symptons() {
    return (this.symptonForm.get('symptons') as FormArray<FormControl>);
  }

  addSympton(){
     const inputs = this.symptonForm.get('symptons') as FormArray;  
     inputs.push(new FormControl('')); 
  }

  get typeMedicines(){   
    return (this.typeOfMedicineForm.get('typeMedicines') as FormArray<FormControl>);
  }

  get moneys(){
    return (this.typeOfMedicineForm.get('moneys') as FormArray<FormControl>);
  }

  get quantitys(){
    return (this.typeOfMedicineForm.get('quantitys') as FormArray<FormControl>);
  }

  get totalMoney(){
    return this.moneys.controls.map(control => control.value).reduce((total, cur) => total + Number(cur.replace(/[^\d]/g, '')), 0);

  }

  addTypeMedicine(){
    this.typeMedicines.push(new FormControl('',Validators.required))
    this.moneys.push(new FormControl('',Validators.required)); 
    const index = this.quantitys.length;
    let quantity = new FormControl(CommonConstant.QUANTITY_DEFAULT,Validators.required);
    quantity?.valueChanges.subscribe(value => {
      this.updateMoney(index,value);
    });
    this.quantitys.push(quantity);
  }
  updateMoney(index:any,value: any){
    const selectedItem = this.sMedicalSupply.find(item =>  
      item.medicineName == this.typeMedicines.at(index).value.medicineName
    );
    if (selectedItem) {
      this.moneys.at(index).setValue(StringUtil.formatCurrency(String(Number(selectedItem.unitPrice) * value)));
      this.sMedicalExamForm.patchValue({
        money: StringUtil.formatCurrency(this.totalMoney)
      });
    }
  }

  addMoney() {
    this.moneys.push(new FormControl('',Validators.required)); // Thêm item mới vào moneys
  }


  // Xử lý sự kiện keydown
  onKeyDown(event: KeyboardEvent, i:any) {
    if (event.key === 'Enter') {
      if(this.quantitys.at(i).value > this.typeMedicines.at(i).value?.quantity){
        this.messageService.add({summary:'Warn',severity:"warn"
          ,detail: this.typeMedicines.at(i).value?.medicineName + " not enough!"
          });
        this.quantitys.at(i).setValue("1");
      }else{
        this.addTypeMedicine();
      }
    }
  }

  addNewFormSympton(event: KeyboardEvent){
    if (event.key === 'Enter') {
      this.addSympton();
    }
  }

  removeTypeMedicine(i: any){
    (this.typeOfMedicineForm.get('typeMedicines') as FormArray).removeAt(i);
    (this.typeOfMedicineForm.get('moneys') as FormArray).removeAt(i);
    (this.typeOfMedicineForm.get('quantitys') as FormArray).removeAt(i);
  }

  removeSympton(){
    let formSympton = (this.symptonForm.get('symptons') as FormArray);
    formSympton.removeAt(formSympton.length - 1);

  }

  // Hàm xử lý sự kiện khi dropdown thay đổi
  onDropdownChange(i: number, event: any): void {
    const selectedItem = this.sMedicalSupply.find(item =>  
      item.medicineName == event.value.medicineName
    );
    console.log('totalMoney',this.totalMoney);
    
    if (selectedItem) {
      this.moneys.at(i).setValue(StringUtil.formatCurrency(String(Number(selectedItem.unitPrice) * this.quantitys.at(i).value)));
      this.sMedicalExamForm.patchValue({
        money: StringUtil.formatCurrency(this.totalMoney)
      });
    }
  }


  

}


