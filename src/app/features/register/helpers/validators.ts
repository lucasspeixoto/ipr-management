import { Validators } from '@angular/forms';

export const personalValidators = {
  name: ['', [Validators.required, Validators.minLength(3)]],
  email: [''],
  sex: ['', Validators.required],
  birth_date: ['', Validators.required],
  cep: ['', [Validators.required, Validators.pattern(/[0-9]{8}/)]],
  address: ['', Validators.required],
  state: ['', [Validators.required, Validators.maxLength(2)]],
  city: ['', Validators.required],
  district: ['', Validators.required],
  complement: ['', [Validators.required, Validators.maxLength(50)]],
  number: ['', Validators.required],
  rg: ['', [Validators.required, Validators.pattern(/[0-9]{9}/)]],
  cpf: ['', [Validators.required, Validators.pattern(/[0-9]{11}/)]],
  cellphone: ['', [Validators.required, Validators.pattern(/[0-9]{11}/)]],
  telephone: ['', [Validators.required, Validators.pattern(/[0-9]{11}/)]],
  naturalness: ['Brasileira', Validators.required],
  photoUrl: [''],
};

export const supplementaryValidators = {
  marital_status: ['', [Validators.required]],
  spouse_name: [''],
  wedding_date: [''],
  schooling: ['', Validators.required],
  profession: ['', [Validators.required, Validators.minLength(3)]],
  father_name: ['', [Validators.required, Validators.minLength(3)]],
  mother_name: ['', [Validators.required, Validators.minLength(3)]],
};

export const ecclesiasticalValidators = {
  membership: ['', [Validators.required, Validators.minLength(3)]],
  craft: ['', Validators.required],
  communities: ['', Validators.required],
  interests: ['', Validators.required],
  baptism: ['', Validators.required],
  baptism_date: [''],
  baptism_shepherd: [''],
};
