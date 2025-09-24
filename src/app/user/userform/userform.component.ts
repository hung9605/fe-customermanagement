import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../user.service';
import CommonConstant from '../../common/constants/CommonConstant';
import { Message } from '../../common/constants/Message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.scss'
})
export class UserformComponent {

  userForm: FormGroup;
  statusOptions = [
    { label: 'Active', value: true },
    { label: 'Disabled', value: false }
  ];
  srcImage = environment.SRC_IMAGE;
  roles: Role[] = [
         {name:'User' ,code:'ROLE_USER' }
        ,{name:'Admin',code:'ROLE_ADMIN'}
  ]
  constructor(private fb : FormBuilder
             ,private ref: DynamicDialogRef
             ,private userService: UserService
             ,private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      username: [''   , Validators.required],
      email:    [''   , [Validators.required, Validators.email]],
      password: [''   , Validators.required],
      status:   [true , Validators.required],
      roles  :   [[],Validators.required]
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
}

interface Role {
    name: string,
    code: string
}