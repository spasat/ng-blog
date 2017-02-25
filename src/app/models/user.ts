import { RIGHTS } from './rights';
import { UserInterface } from './user.interface';

export class User implements UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    rights?: Array<string>;
    is_subscribed?: boolean | string;

    constructor(data: UserInterface) {
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.rights = data.rights ? data.rights : [RIGHTS.USESR];
        this.is_subscribed = data.is_subscribed ? <boolean>data.is_subscribed : true;
    }
}
