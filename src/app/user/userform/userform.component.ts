import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from '../user.service';

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

  constructor(private fb : FormBuilder
             ,private ref: DynamicDialogRef
             ,private userService: UserService
  ) {
    this.userForm = this.fb.group({
      username: [''   , Validators.required],
      email:    [''   , [Validators.required, Validators.email]],
      password: [''   , Validators.required],
      status:   [true , Validators.required]
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }
    this.userService.add(this.userForm.value).subscribe({
       next: ({data}) => {}
      ,error: err => console.log(err)
      
    })
  }


  cancel(){
    this.ref.close();
  }
}