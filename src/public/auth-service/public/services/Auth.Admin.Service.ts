import { Observable } from 'rxjs';
import { Provider } from '../interfaces/Provider';
import { Role } from '../interfaces/Role';
import { User } from '../interfaces/User';

export interface AuthAdminService {
    assignRole(roleId: number, userId: number): Observable<void>;
    deleteRole(roleId: number): Observable<void>;
    getProviders(): Observable<Provider[]>;
    getRoles(): Observable<Role[]>;
    getUserRoles(): Observable<Role[]>;
    getUsers(): Observable<User[]>;
    insProvider(providerName: string): Observable<number>;
    revokeRole(): Observable<void>;
    upsertRole(id: number | undefined, name: string, defaultRole: boolean, description: string): Observable<number>;
}