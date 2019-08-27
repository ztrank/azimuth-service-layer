import { injectable, inject } from 'inversify';
import { Symbols } from '../../../symbols';
import { DataLayer, AuthInterface } from '../../../service-references';
import { AuthService, User as IUser } from '../../../public/auth-service/public';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../responses/implementations/auth/User';

@injectable()
export class AuthServiceImpl implements AuthService {

    private dataLayer: AuthInterface.Procedures;
    
    public constructor(
        @inject(Symbols.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<AuthInterface.Procedures>
    ) {
        this.dataLayer = dataLayerFactory('auth_interface');
    }

    public findUserAndRoles(providerName: string, providerUserId: string): Observable<IUser> {
        return this.dataLayer.findUserAndRoles(providerName, providerUserId)
            .pipe(map(res => new User(res[0][0], res[1])))
    }

    public findUser(providerName: string, providerUserId: string): Observable<User> {
        return this.dataLayer.findUser(providerName, providerUserId)
            .pipe(map(res => new User(res[0][0])))
    }

    public registerUser(providerName: string, providerUserId: string, username: string): Observable<number> {
        return this.dataLayer.registerUser(providerName, providerUserId, username)
            .pipe(map(r => r[0][0].user_id));
    }

    public testUsername(username: string): Observable<boolean> {
        return this.dataLayer.testUsername(username)
            .pipe(map(r => r[0][0].available === 'Y'));
    }
}