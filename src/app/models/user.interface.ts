export interface UserInterface {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    rights?: Array<string>;
    is_subscribed?: boolean|string;
}
