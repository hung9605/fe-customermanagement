import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MedicalService } from './medical.service';
import MedicalSupplies from './medicalsupplies';
import StringUtil from '../common/utils/StringUtils';

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
  constructor(private dialogConfig:DynamicDialogConfig,
              private medicalServie:MedicalService,
              private ref:DynamicDialogRef,
              private messageService:MessageService,
              private router: Router){
  }

  ngOnInit(): void {

    this.medicalServie.listMedicalSupplies().subscribe({
      next: data => {
        this.sMedicalSupply = data.data;
        console.log('sMedicalSupply', this.sMedicalSupply);
        
      }
    });

    this.dataDialog = this.dialogConfig.data;
    this.sMedicalExamForm = new FormGroup({
      id: new FormControl(this.dataDialog.idexam),
      fullName: new FormControl(this.dataDialog.fullName),
      timeRegister: new FormControl(this.dataDialog.timeRegister),
      status: new FormControl(this.dataDialog.status),
      dayOfExamination: new FormControl(this.dataDialog.dateRegister),
      money: new FormControl(this.dataDialog.totalMoney),
    });
    this.isReadOnly = this.dataDialog.isReadOnly;
    this.isUpdate = this.dataDialog.isUpdate;
    this.symptonForm = new FormGroup({
      symptons: new FormArray([])
    });
    this.typeOfMedicineForm = new FormGroup({
      typeMedicines: new FormArray([]),
      moneys: new FormArray([]),
      quantitys: new FormArray([])
    });
    const symptonArr = this.symptonForm.get('symptons') as any;
    const moneyArr = this.typeOfMedicineForm.get('moneys') as any;  
    const typeMedicineArr = this.typeOfMedicineForm.get('typeMedicines') as any;
    const quantityArr = this.typeOfMedicineForm.get('quantitys') as any;
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
      typeMedicineArr.push(new FormControl(data,Validators.required));
    });
  }else{
    symptonArr.push(new FormControl('',Validators.required));
    moneyArr.push(new FormControl('',Validators.required));
    typeMedicineArr.push(new FormControl('',Validators.required));
    quantityArr.push(new FormControl('1', Validators.required));
  }
   
  }

  ngOnDestroy(): void {
    this.isReadOnly = true;
  }

  save(){
    console.log('typeOfMedicineForm',this.typeOfMedicineForm);
    
     if(this.sMedicalExamForm.valid && this.typeOfMedicineForm.valid){
     const values = this.symptons.map((control:FormControl) => control.value);
    let medicalExam = {
      id:this.f['id'].value==null?0:this.f['id'].value,
      fullName: this.f['fullName'].value,
      status: 1,
      sympton: this.symptonsValue ,
      typeOfMedicine: this.typeMedicineValue,
      dayOfExamination: this.f['dayOfExamination'].value,
      medical:{
        id:this.dataDialog.idSchedule
      },
      money: this.moneysValue,
      totalMoney: this.totalMoney
    }
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
  }else{
    this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Field not blank!'});
  }

  }

  get typeMedicineValue(): string{
    return Object.keys(this.typeMedicines).map(key => {
      return  this.typeMedicines[key]?.value.medicineName ;
    }).join(',');
  }

  get moneysValue(): string{
    return Object.keys(this.moneys).map(key => {
      return  this.moneys[key]?.value ;
    }).join(',');
  }

  get symptonsValue(): string{
    return Object.keys(this.symptons).map(key => {
      return  this.symptons[key]?.value ;
    }).join(',');
  }

  close(){
    this.ref.close();
  }

  get f(){return this.sMedicalExamForm.controls;}

  edit(){
    this.isReadOnly = false;
  }

  get symptons() {
    return (this.symptonForm.get('symptons') as any).controls;
  }

  addSympton(){
    console.log('fdfd',this.symptonForm);
     const inputs = this.symptonForm.get('symptons') as any;  
     inputs.push(new FormControl('')); 
  }

  get typeMedicines(){
    return (this.typeOfMedicineForm.get('typeMedicines') as any).controls;
  }

  get moneys(){
    return (this.typeOfMedicineForm.get('moneys') as any).controls;
  }

  get quantitys(){
    return (this.typeOfMedicineForm.get('quantitys') as any).controls;
  }

  get totalMoney(){
    return Object.keys(this.moneys).map(key => {
      return  this.moneys[key]?.value ;
    }).reduce((total,cur) => total + Number(cur),0);
  }

  addTypeMedicine(){
    this.typeMedicines.push(new FormControl('',Validators.required))
    this.moneys.push(new FormControl('',Validators.required)); 
  }

  addMoney() {
    this.moneys.push(new FormControl('',Validators.required)); // Thêm item mới vào moneys
  }

  // onChange(e: Event){
  //   this.sMedicalExamForm.patchValue({
  //     money: this.totalMoney
  //   });
    
  // }

  // Xử lý sự kiện keydown
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTypeMedicine();
      //this.addMoney();
    }
  }

  addNewFormSympton(event: KeyboardEvent){
    if (event.key === 'Enter') {
      this.addSympton();
      //this.addMoney();
    }
  }

  removeTypeMedicine(i: any){
    (this.typeOfMedicineForm.get('typeMedicines') as FormArray).removeAt(i);
    (this.typeOfMedicineForm.get('moneys') as FormArray).removeAt(i);
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
    if (selectedItem) {
      this.moneys.at(i).setValue(selectedItem.unitPrice);
      this.sMedicalExamForm.patchValue({
        money: StringUtil.formatCurrency(this.totalMoney)
      });
    }
  }
  

}


