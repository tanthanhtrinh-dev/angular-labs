import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Customer } from 'src/app/customers/customer';

//Custom Validators
// function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
//   if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
//     return { range: true };
//   }
//   return null;
// }
//Custom Validators with parameters
function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (
      c.value !== null &&
      (isNaN(c.value) || c.value < min || c.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
}

//Custom Validators in FromGroup
function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');
  //skip the validation when the formcontrol has not been touched yet
  if (emailControl?.pristine || confirmControl?.pristine) {
    return null;
  }

  if (emailControl?.value === confirmControl?.value) {
    return null;
  }
  return { match: true };
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
      emailGroup: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required]],
        },
        { validator: emailMatcher }
      ),
      //email: ['', [Validators.required, Validators.email]],
      //confirmEmail: ['',[Validators.required]],
      phone: '',
      notification: 'email',
      //rating: [null, [Validators.min(1), Validators.max(5)]],
      rating: [null, ratingRange(1, 5)],
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
