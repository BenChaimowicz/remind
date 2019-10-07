import { FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

export class RegistrationValidators {
  static userNamePattern = '^[a-zA-Z0-9_-]{3,20}$';

  static cannotContainSpace(control: AbstractControl): ValidationErrors {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }

  public static mustBeSameAs(control: AbstractControl): ValidationErrors {
    if ((control.get('passwordVerify').value) !== (control.get('passwordInput').value)) {
      control.get('passwordVerify').setErrors({ passwordsDontMatch: true });
      return { passwordsDontMatch: true };
    }
    control.get('passwordVerify').setErrors(null);
    return null;
  }
}
