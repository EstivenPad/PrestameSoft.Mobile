const cedulaMask:(string | RegExp)[] = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,'-', /\d/];
const phoneMask:(string | RegExp)[] = ['(', /\d/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export { cedulaMask, phoneMask };