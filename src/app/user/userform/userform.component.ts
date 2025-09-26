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
  roleUser?: Role[];
  isEdit = true;
  constructor(private fb : FormBuilder
             ,private ref: DynamicDialogRef
             ,private userService: UserService
             ,private messageService: MessageService
             ,private dialogConfig:DynamicDialogConfig
  ) {
   
  }

  ngOnInit(): void {
    this.data = this.dialogConfig.data;
    const {username,email,status,role} = this.data;
    const roleUpdate = role;  
    this.userForm = this.fb.group({
      username: [username   , Validators.required],
      email:    [email   , [Validators.required, Validators.email]],
      password: [''   , Validators.required],
      status:   [status , Validators.required],
      roles:    [[],Validators.required]
    });
    if(username){
      this.getRole(username);
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }
    this.userService.add(this.userForm.value).subscribe({
       next: ({data}) => {
        this.messageService.add({summary:CommonConstant.SUCCESS_TITLE,severity:CommonConstant.SUCCESS,detail:Message.SUCCESS.SAVE_SUCCESS});
        setTimeout(() =>{
          this.userService.close();
          this.cancel();
        },200)
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

  getRole(username: string){
    this.userService.getRole(username).subscribe({
      next: ({data}) => {
        const roleApi = (data as {authority: string}[]).map(item => item.authority).join(',');
        this.roleUser = this.roles.filter(item => roleApi.includes(item.code));
        this.userForm.patchValue({
          roles: this.roleUser
        })
      },
      error: err => {console.log(err);
      }
    })
  }

  edit(){
    this.isEdit = false;
  }

  ngOnDestroy(): void {
    
  }
}

interface Role {
    name: string,
    code: string
}