import { debounceTime } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray,
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
  const emailControl: AbstractControl | any = c.get('email');
  const confirmControl: AbstractControl | any = c.get('confirmEmail');
  //skip the validation when the formcontrol has not been touched yet
  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
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
  accountForm: FormGroup;
  customer: Customer = new Customer();
  emailMessage: string = '';

  get addresses(): FormArray {
    return <FormArray>this.accountForm.get('addresses');
  }
  //Ref: https://stackoverflow.com/questions/40358434/typescript-ts7015-element-implicitly-has-an-any-type-because-index-expression/40358512#40358512
  private _validationMessages: { [key: string]: string } = {
    required: 'Please enter your email address.',
    email: 'Please enter a valid email address.',
  };

  constructor(private fb: FormBuilder) {
    this.accountForm = this.fb.group({});
  }

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
      phone: null,
      notification: 'email',
      //rating: [null, [Validators.min(1), Validators.max(5)]],
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true,
      // addresses: this.fb.group({
      //   addressType: 'home',
      //   street1: '',
      //   street2: '',
      //   city: '',
      //   state: '',
      //   zip: '',
      // }),
      addresses: this.fb.array([this.buildAddress()]),
    });

    this.accountForm.get('notification')?.valueChanges.subscribe((s) => {
      return this.setNotification(s);
      //console.log(JSON.stringify(s));
    });

    const emailControl = this.accountForm.get('emailGroup.email');

    emailControl?.valueChanges.pipe(debounceTime(1000)).subscribe((s) => {
      console.log(s);
      this.setMessage(emailControl);
    });
  }
  save() {
    console.log(this.accountForm);
    console.log('Saved: ' + JSON.stringify(this.accountForm.value));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';

    //console.log(c.touched);
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map((key) => {
          console.log(key);
          return this._validationMessages[key];
        })
        .join(' ');
    }
  }
  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    });
  }
  addAddress(): void{
    this.addresses.push(this.buildAddress());
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
