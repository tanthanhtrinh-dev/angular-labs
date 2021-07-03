import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Customer } from 'src/app/customers/customer';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;
  customer: Customer = new Customer();

  constructor() {

  }

  ngOnInit(): void {
    this.accountForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)
    });
  }
  save() {
    console.log(this.accountForm);
    console.log('Saved: ' + JSON.stringify(this.accountForm.value));
  }
  populateTestDate(){
    this.accountForm.setValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      email: 'tantrinh@tpfgroup.cc', 
      sendCatalog: false     
    });
    // this.accountForm.patchValue({
    //   firstName: 'Jack',
    //   lastName: 'Harkness'
    // });
  }
}
