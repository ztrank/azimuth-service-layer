import { Role } from './Role';

export interface User  {
    id: number;
    username: string;
    active: boolean;
    roles?: Role[]
}