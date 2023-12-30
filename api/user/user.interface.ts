export interface User {
    title?: string;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    role: 'admin' | 'normal_user';
    is_active: boolean;
}