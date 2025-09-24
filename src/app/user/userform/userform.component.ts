import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../user.service';
import CommonConstant from '../../common/constants/CommonConstant';
import { Message } from '../../common/constants/Message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.scss'
})
export class UserformComponent implements OnInit,OnDestroy {

  userForm !: FormGroup;
  statusOptions = [
    { label: 'Active', value: true },
    { label: 'Disabled', value: false }
  ];
  srcImage = environment.SRC_IMAGE;
  roles: Role[] = [
         {name:'User' ,code:'ROLE_USER' }
        ,{name:'Admin',code:'ROLE_ADMIN'}
  ];
  data: any;
  constructor(private fb : FormBuilder
             ,private ref: DynamicDialogRef
             ,private userService: UserService
             ,private messageService: MessageService
             ,private dialogConfig:DynamicDialogConfig
  ) {
   
  }

  ngOnInit(): void {
    this.data = this.dialogConfig.data;
    console.log('dataaaaaa', this.data);
    
    const {username,email,status,role} = this.data;
    this.userForm = this.fb.group({
      username: [username   , Validators.required],
      email:    [email   , [Validators.required, Validators.email]],
      password: [''   , Validators.required],
      status:   [status , Validators.required],
      roles:    [[],Validators.required]
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }
    console.log(this.userForm.value);
    //return;
    
    this.userService.add(this.userForm.value).subscribe({
       next: ({data}) => {
        this.messageService.add({summary:CommonConstant.SUCCESS_TITLE,severity:CommonConstant.SUCCESS,detail:Message.SUCCESS.SAVE_SUCCESS});
        setTimeout(() =>{
          this.cancel();
        })
       }
      ,error: err => {
        console.log(err);
        this.cancel();
      }
    })
  }


  cancel(){
    this.ref.close();
  }

  ngOnDestroy(): void {
    
  }
}

interface Role {
    name: string,
    code: string
}