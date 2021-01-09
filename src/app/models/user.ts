import { Role } from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    fullName: string;
    role: Role;
    hoten: string;
    taikhoan: string;
    matkhau: string;
    email: string;
    token?: string;
}
