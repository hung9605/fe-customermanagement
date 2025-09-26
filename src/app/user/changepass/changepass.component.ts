import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Password } from 'primeng/password';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/api';
import CommonConstant from '../../common/constants/CommonConstant';
import { Message } from '../../common/constants/Message';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.scss'
})
export class ChangepassComponent implements OnInit,OnDestroy{

  userForm !: FormGroup;
  srcImage = environment.SRC_IMAGE;

  constructor(  private fb: FormBuilder
                ,private ref: DynamicDialogRef
                ,private userService: UserService
                ,private messageService: MessageService
                ,private dialogConfig:DynamicDialogConfig
  ){
  }

  ngOnInit(): void {
    const {username} = this.dialogConfig.data;
    this.userForm = this.fb.group({
       username: [username]
      ,currentPass: ['',Validators.required]
      ,newPass    : ['',Validators.required]
      ,confirmPass: ['',Validators.required]
    })
  }

  onSubmit(){
    if(this.userForm.invalid)
      return;
    if(this.f['newPass']?.value != this.f['confirmPass'].value){
       this.messageService.add({severity:CommonConstant.ERROR,summary:CommonConstant.ERROR_TITLE, detail: 'Password not same !'});
       return;
    }
    this.userService.changePass(this.userForm.value).subscribe({
      next: ({data}) => {
        this.messageService.add({summary:CommonConstant.SUCCESS_TITLE,severity:CommonConstant.SUCCESS,detail:Message.SUCCESS.SAVE_SUCCESS});
        setTimeout(() =>{
          this.cancel();
        },200)
      },
      error: ({error}) => {console.log(error);
        this.messageService.add({severity:CommonConstant.ERROR,summary:CommonConstant.ERROR_TITLE, detail: error.data});
      }
    })

  }

  cancel(){
    this.ref.close();
  }

  ngOnDestroy(): void {
    
  }

  get f(){
    return this.userForm.controls;
  }

}
