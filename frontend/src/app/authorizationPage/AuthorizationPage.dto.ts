import {UserRole} from 'app/redux/userRole/UserRole.type';

export interface UserDTO {
    email: string;
    password: string
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    token: string;
    email: string;
    role: UserRole;
}