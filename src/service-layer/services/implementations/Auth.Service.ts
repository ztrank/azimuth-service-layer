import { injectable, inject, interfaces } from 'inversify';
import { DataLayer, AuthInterface } from '../../../service-references';
import { AuthService, User as IUser } from '../../../public/auth-service/public';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../responses/implementations/auth/User';
import { Exception, HttpExceptions } from '../../../service-references/azimuth-exceptions';
import { EnsureLength } from '../../operators/ensure.length';
import { TYPES } from '../../../service-references/azimuth-types';

@injectable()
export class AuthServiceImpl implements AuthService {

    private dataLayer: AuthInterface.Procedures;
    
    public constructor(
        @inject(TYPES.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<AuthInterface.Procedures>,
        @inject(HttpExceptions.NotFoundException) private NotFoundException: interfaces.Newable<Exception>,
        @inject(HttpExceptions.InternalServerException) private InternalServerException: interfaces.Newable<Exception>
    ) {
        this.dataLayer = dataLayerFactory('auth_interface');
    }

    public findUserAndRoles(providerName: string, providerUserId: string): Observable<IUser> {
        return this.dataLayer.findUserAndRoles(providerName, providerUserId)
            .pipe(
                EnsureLength(this.NotFoundException, 2, 1),
                map(res => new User(res[0][0], res[1]))
            )
    }

    public findUser(providerName: string, providerUserId: string): Observable<User> {
        return this.dataLayer.findUser(providerName, providerUserId)
            .pipe(
                EnsureLength(this.NotFoundException, 1, 1),
                map(res => new User(res[0][0]))
            )
    }

    public registerUser(providerName: string, providerUserId: string, username: string): Observable<number> {
        return this.dataLayer.registerUser(providerName, providerUserId, username)
            .pipe(
                EnsureLength(this.InternalServerException, 1, 1),
                map(r => r[0][0].user_id)
            );
    }

    public testUsername(username: string): Observable<boolean> {
        return this.dataLayer.testUsername(username)
            .pipe(
                EnsureLength(this.InternalServerException, 1, 1),
                map(r => r[0][0].available === 'Y')
            );
    }

    public getUser(userId: number): Observable<User> {
        return this.dataLayer.getUser(userId)
            .pipe(
                EnsureLength(this.NotFoundException, 2, 1),
                map(r => new User(r[0][0], r[1]))
            )
    }
}