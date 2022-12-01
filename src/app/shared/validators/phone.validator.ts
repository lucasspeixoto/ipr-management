import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;

		if (!value) {
			return null;
		}

		const validPhone = /^[- +()0-9]+$/.test(value);

		return !validPhone ? { validPhone: true } : null;
	};
}
