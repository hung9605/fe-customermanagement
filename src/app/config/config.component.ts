import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Config from './config';
import { ConfigService } from './config.service';
import { MessageService } from 'primeng/api';
import CommonConstant from '../common/constants/CommonConstant';
import { Message } from '../common/constants/Message';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent implements OnInit {

  srcImage = environment.SRC_IMAGE;
  configData !: Config[];
  configForm!: FormGroup;
  isLoading = true;
  constructor(private fb: FormBuilder
             ,private ref: DynamicDialogRef
             ,private configService: ConfigService
             ,private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getAllConfig();
    this.configForm = this.fb.group({
        options: this.fb.array([])
    }); 
  }

   get optionsFormArray(): FormArray {
    return this.configForm.get('options') as FormArray;
  }

  save(): void {
  const formArray = this.configForm.get('options') as FormArray;
  const changedItems: any[] = [];

  formArray.controls.forEach((control, i) => {
    if (control.dirty) {
      changedItems.push(control.value);
    }
  });
    if (changedItems.length === 0) {
    console.log("❌ Không có thay đổi, không cần gọi API");
    return;
  }
    const payload = changedItems.map(item => ({
      id: item.id,
      configKey: item.configKey,
      configValue: item.type === 'switch' ?  item.value?'1':'0' : item.value, // gán từ value
      type: item.type,
      label: item.label
    }));

    this.configService.updateConfig(payload).subscribe({
      next: data => {
        this.messageService.add({severity:CommonConstant.SUCCESS,summary:CommonConstant.SUCCESS_TITLE,detail:'Config Update Successfully'});
        this.ngOnInit();
        this.isLoading = true;
      },
      error: err => { console.log(err);
      }
    });
  }

  cancel(): void {
    this.ref.close();
  }

  getAllConfig(){
    this.configService.getConfig().subscribe({
      next : ({data}) => {
        console.log(data);
        this.configData = data;
        this.configForm = this.fb.group({
          options: this.fb.array(
            this.configData.map(opt =>
            this.fb.group({
              id: [opt.id],
              label: [opt.label],
              value: [opt.type === 'switch' ? opt.configValue === '1' : opt.configValue],
              type: [opt.type],
              configKey: [opt.configKey]
            })
        )
      )
    });
    setTimeout(() => {
       this.isLoading = false;
    },50);
    },
      error: err => {
          console.log(err);
          this.isLoading = false;
      }
      
    })
  }

}
