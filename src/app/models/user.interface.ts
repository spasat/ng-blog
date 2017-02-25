export interface UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    rights?: Array<string>;
    is_subscribed?: boolean|string;
}
