import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MedicalService } from './medical.service';
import MedicalSupplies from './medicalsupplies';
import StringUtil from '../common/utils/StringUtils';
import CommonConstant from '../common/constants/CommonConstant';
import { Dropdown } from 'primeng/dropdown';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

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
  @ViewChildren('inputField') inputFields !: QueryList<any>;
  @ViewChildren('inputMedicine') inputMedicines !: QueryList<any>;
  srcImage = environment.SRC_IMAGE;
  isEdit= true;
  
  constructor(private dialogConfig:DynamicDialogConfig,
              private medicalServie:MedicalService,
              private ref:DynamicDialogRef,
              private messageService:MessageService,
              private router: Router,
              private fb: FormBuilder){
  }

  async ngOnInit() {

    
    this.dataDialog = this.dialogConfig.data;

    const {
      isReadOnly,
      isUpdate,
      idexam,
      fullName,
      phoneNumber,
      timeRegister,
      status,
      dateRegister,
      totalMoney,
      temperature,
      healthCondition,
      timeActual,
      gender,
      sympton,
      money,
      quantity,
      typeOfMedicine
    } = this.dataDialog;
    
    
    this.isReadOnly = isReadOnly;
    this.isUpdate = isUpdate;
    
    this.sMedicalExamForm = this.fb.group({
      id: [idexam],
      fullName: [fullName],
      phoneNumber: [phoneNumber],
      timeRegister: [timeRegister],
      status: [status],
      dayOfExamination: [dateRegister],
      money: [totalMoney],
      temperature: [temperature, Validators.required],
      healthCondition: [healthCondition, Validators.required],
      timeActual: [timeActual],
      gender: [gender],
    });
    
    this.symptonForm = this.fb.group({
      symptons: this.fb.array([]),
    });
  
    this.typeOfMedicineForm = this.fb.group({
      typeMedicines: this.fb.array([]),
      moneys: this.fb.array([]),
      quantitys: this.fb.array([]),
    });

    const data = await firstValueFrom(this.medicalServie.listMedicalSupplies());
    this.sMedicalSupply = data.data;
    const symptonArr = this.symptonForm.get('symptons') as FormArray<FormControl>;
    const moneyArr = this.typeOfMedicineForm.get('moneys') as FormArray<FormControl>;  
    const typeMedicineArr = this.typeOfMedicineForm.get('typeMedicines') as FormArray<FormControl>;
    const quantityArr = this.typeOfMedicineForm.get('quantitys') as FormArray<FormControl>;
    if(this.isUpdate){
      const symptonLst = sympton?.split(',') ?? [];
      const moneyLst = money?.split(',') ?? [];
      const quantityLst = quantity?.split(',') ?? [];
      const typeMedicineLst = typeOfMedicine?.split(',') ?? [];
      this.pushToFormArray(symptonLst, symptonArr);
      this.pushToFormArray(moneyLst, moneyArr);
      
    
      typeMedicineLst.forEach((name: string) => {
        const selectedItem = this.sMedicalSupply.find(item => item.medicineName === name);
        typeMedicineArr.push(new FormControl(selectedItem, Validators.required));
      });
    
      quantityLst.forEach((valStr: string, i: number) => {
        const val = Number(valStr) || 0;  // chuyển string thành number, fallback 0
        const quantityCtrl = new FormControl(val, Validators.required);
        quantityCtrl.valueChanges.subscribe(value => this.updateMoney(i, value));
        quantityArr.push(quantityCtrl);
      });
/*   
      -- dev prescription
*/
  }else{
    this.pushToFormArray([''], symptonArr);
    this.pushToFormArray([''], moneyArr);
  // Với typeMedicineArr, đẩy form control rỗng:
    typeMedicineArr.push(new FormControl('', Validators.required));
    let quantity = new FormControl(CommonConstant.QUANTITY_DEFAULT,Validators.required);
    quantity.valueChanges.subscribe(value => {
      this.updateMoney(0,value);
    });
    quantityArr.push(quantity);
    } 
  }

  private pushToFormArray(list: string[], formArray: FormArray<FormControl>) {
    list.forEach(item => {
      formArray.push(new FormControl(item, Validators.required));
    });
  }
  

  ngOnDestroy(): void {
    this.isReadOnly = true;
  }

  save(){
     if(this.sMedicalExamForm.valid && this.typeOfMedicineForm.valid){
      const {
        id,
        fullName,
        temperature,
        healthCondition,
        dayOfExamination,
      } = this.f;
      const medicalExam = {
        id: id.value ?? 0,
        fullName: fullName.value,
        status: 1,
        temperature: (id.value == null ? temperature.value + '°C' : temperature.value),
        healthCondition: healthCondition.value,
        sympton: this.symptonsValue,
        typeOfMedicine: this.typeMedicineValue,
        dayOfExamination: dayOfExamination.value,
        medical: { id: this.dataDialog.id },
        money: this.moneysValue,
        totalMoney: this.totalMoney,
        quantity: this.quantitysValue,
        prescription: [],
        createdAt: this.isUpdate ? this.dataDialog.createdAt : '',
        createdBy: this.isUpdate ? this.dataDialog.createdBy : '',
        timeActual: StringUtil.getCurTime(),
      };
    
  const handleSuccess = (data: any) => {
    this.messageService.add({
      severity: CommonConstant.SUCCESS,
      summary: CommonConstant.SUCCESS_TITLE,
      detail: 'Save successfully ' + data.data.fullName
    });
    setTimeout(() => {
      this.ref.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/listregister']);
      });
    }, 500);
  };

  const request$ = this.isUpdate
  ? this.medicalServie.updateMedicalExam(medicalExam)
  : this.medicalServie.addMedicalExam(medicalExam);

  request$.subscribe({
    next: handleSuccess,
    error: (err) => {
      this.messageService.add({ severity: CommonConstant.ERROR, summary: CommonConstant.ERROR_TITLE, detail: err.message || 'Save failed' });
    }
  });
  }else{
    this.messageService.add({severity: CommonConstant.ERROR, summary: CommonConstant.ERROR_TITLE, detail: 'Field not blank!'});
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
    this.isEdit = false;
  }

  get symptons() {
    return (this.symptonForm.get('symptons') as FormArray<FormControl>);
  }

  addSympton(){
     const inputs = this.symptonForm.get('symptons') as FormArray;  
     inputs.push(new FormControl('')); 
     this.setFocusToNewInput(this.inputFields);
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
    this.setFocusToNewInput(this.inputMedicines);
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
      // validate quantity now disabled validate
      // if(Number(this.quantitys.at(i).value) > Number(this.typeMedicines.at(i).value?.quantity)){
      //   this.messageService.add({summary:'Warn',severity:"warn"
      //     ,detail: this.typeMedicines.at(i).value?.medicineName + " not enough!"
      //     });
      //   this.quantitys.at(i).setValue("1");
      // }else{
      //   this.addTypeMedicine();
      // }
      this.addTypeMedicine();
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
    if (selectedItem) {
      this.moneys.at(i).setValue(StringUtil.formatCurrency(String(Number(selectedItem.unitPrice) * this.quantitys.at(i).value)));
      this.sMedicalExamForm.patchValue({
        money: StringUtil.formatCurrency(this.totalMoney)
      });
    }
  }

  setFocusToNewInput(inputFields: any) {
    // Đảm bảo rằng focus vào trường input mới được thêm vào
    setTimeout(() => {
      const lastInputField = inputFields.toArray().pop();
      if (lastInputField instanceof Dropdown) {
        lastInputField.focus();
      }else{
        lastInputField.nativeElement.focus();
      }
    }, 50);
  }


  

}


