import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  // CPF
  static checkCPF(cpf: string): boolean {
    let digit1 = 0;
    let digit2 = 0;

    const regex = new RegExp('[0-9]{11}');

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999' ||
      !regex.test(cpf)
    ) return false;
    else {
      for (let i = 0; i < 10; i++) {
        digit1 = i < 9 ? (digit1 + (parseInt(cpf[i]) * (11 - i - 1))) % 11 : digit1;
        digit2 = (digit2 + (parseInt(cpf[i]) * (11 - i))) % 11;
      }

      return ((parseInt(cpf[9]) === (digit1 > 1 ? 11 - digit1 : 0)) &&
                (parseInt(cpf[10]) === (digit2 > 1 ? 11 - digit2 : 0)));
    }
  }

  validatorCPF(control: AbstractControl): ValidatorFn {
    const value = control.value;
    let result = null;
    if (control.value && !ValidatorService.checkCPF(value)) result = {invalid: true};
    return result;
  }

  cleanCPF(cpf: string): string {
    return cpf.replace(/\./gi, '').replace('-', '');
  }
}
