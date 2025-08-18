import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Config from './config';
import { ConfigService } from './config.service';

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
  ){

  }

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
    console.log(this.configForm.value);
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
              label: [opt.configKey],
              value: [opt.configValue == '1']
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
