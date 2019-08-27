import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

export interface AuthService {
    findUserAndRoles(providerName: string, providerUserId: string): Observable<User>;
    findUser(providerName: string, providerUserId: string): Observable<User>;
    registerUser(providerName: string, providerUserId: string, username: string): Observable<number>;
    testUsername(username: string): Observable<boolean>;
}