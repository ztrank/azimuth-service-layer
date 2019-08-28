import { Role } from './Role';

export interface UserInfo {
    id?: number;
    username?: string;
    roles: Role[];
}