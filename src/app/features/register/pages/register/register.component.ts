import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { emailValidator } from '@app/shared/validators/email.validator';
import { phoneValidator } from '@app/shared/validators/phone.validator';
import { sexOptions } from '@constants/form-options';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public readonly sexOptions = sexOptions;

  public personalForm = this._formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    sex: [null, Validators.required],
    birth_date: [null, Validators.required],
    cep: [null, Validators.required],
    address: [null, Validators.required],
    state: [null, Validators.required],
    city: [null, Validators.required],
    district: [null, Validators.required],
    number: [null, Validators.required],
    rg: [null, Validators.required],
    cpf: [null, Validators.required],
    email: [null, [Validators.required, emailValidator()]],
    cellphone: [null, [Validators.required, phoneValidator()]],
    telephone: [null, [phoneValidator()]],
    naturalness: [null, Validators.required],
  });
  public secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private readonly _formBuilder: FormBuilder) {}
}
