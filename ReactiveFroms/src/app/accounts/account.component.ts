import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Customer } from 'src/app/customers/customer';

function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { range: true };
  }
  return null;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  accountForm!: FormGroup;
  customer: Customer = new Customer();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //init by FormBuilder
    // this.accountForm = this.fb.group({
    //   firstName: { value: 'n/a', disabled: true },
    //   lastName: '',
    //   email: '',
    //   sendCatalog: { value: true, disabled: false },
    // });

    //init by FormGroup
    // this.accountForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // });

    this.accountForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      notification: 'email',
      //rating: [null, [Validators.min(1), Validators.max(5)]],
      rating: [null, ratingRange],
      sendCatalog: { value: true, disabled: false },
    });
  }
  save() {
    console.log(this.accountForm);
    console.log('Saved: ' + JSON.stringify(this.accountForm.value));
  }
  populateTestDate() {
    this.accountForm.setValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      email: 'tantrinh@tpfgroup.cc',
      sendCatalog: false,
    });
    // this.accountForm.patchValue({
    //   firstName: 'Jack',
    //   lastName: 'Harkness'
    // });
  }
  setNotification(notifyVia: string) {
    const phoneControl = this.accountForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
}
