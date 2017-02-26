import { FormGroup } from '@angular/forms';

export function validateConfirm(input: string, confirmInput: string) {

    return function (form: FormGroup) {
        if (form.get(input).value === form.get(confirmInput).value) {
            return null;
        }

        return {
            validatePassword: {
                valid: false
            }
        };
    };
};
