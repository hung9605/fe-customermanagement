import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validadmin',
  templateUrl: './validadmin.component.html',
  styleUrl: './validadmin.component.scss'
})
export class ValidadminComponent implements OnInit, OnDestroy {

  sValidate !: FormGroup;

  ngOnInit(): void {
    this.sValidate = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
    
  }

  ngOnDestroy(): void {
    
  }

  // Handle form submission
  login() {

  }
}
