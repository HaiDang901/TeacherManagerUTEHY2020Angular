import { Role } from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    fullname: string;
    role: Role;
    token?: string;
}
