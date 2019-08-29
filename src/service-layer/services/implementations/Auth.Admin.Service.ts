import { injectable, inject, interfaces } from 'inversify';
import { AuthAdminService } from '../../../public/auth-service/public';
import { Symbols } from '../../../symbols';
import { AuthInterface, DataLayer } from '../../../service-references';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Provider } from '../../responses/implementations/auth/Provider';
import { Role } from '../../responses/implementations/auth/Role';
import { User } from '../../responses/implementations/auth/User';
import { Exception, HttpExceptions } from '../../../service-references/azimuth-exceptions';
import { EnsureLength } from '../../operators/ensure.length';

@injectable()
export class AuthAdminServiceImpl implements AuthAdminService {
    private dataLayer: AuthInterface.Procedures;
    
    public constructor(
        @inject(Symbols.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<AuthInterface.Procedures>,
        @inject(HttpExceptions.NotFoundException) private NotFoundException: interfaces.Newable<Exception>,
        @inject(HttpExceptions.InternalServerException) private InternalServerException: interfaces.Newable<Exception>
    ) {
        this.dataLayer = dataLayerFactory('auth_interface');
    }

    public assignRole(roleId: number, userId: number): Observable<void> {
        return this.dataLayer.assignRole(roleId, userId)
            .pipe(
                map(() => {})
            );
    }
    public deleteRole(roleId: number): Observable<void> {
        return this.dataLayer.deleteRole(roleId)
            .pipe(
                map(() => {})
            );
    }
    public getProviders(): Observable<Provider[]> {
        return this.dataLayer.getProviders()
            .pipe(
                EnsureLength(this.NotFoundException, 1),
                map(res => res[0].map(r => new Provider(r)))
            );
    }
    public getRoles(): Observable<Role[]> {
        return this.dataLayer.getRoles()
            .pipe(
                EnsureLength(this.NotFoundException, 1),
                map(res => res[0].map(r => new Role(r)))
            );
    }
    public getUserRoles(userId: number): Observable<Role[]> {
        return this.dataLayer.getUserRoles(userId)
            .pipe(
                EnsureLength(this.NotFoundException, 1),
                map(res => res[0].map(r => new Role(r)))
            );
    }
    public getUsers(): Observable<User[]> {
        return this.dataLayer.getUsers()
            .pipe(
                EnsureLength(this.NotFoundException, 1),
                map(res => res[0].map(r => new User(r)))
            );
    }
    public insProvider(providerName: string): Observable<number> {
        return this.dataLayer.insProvider(providerName)
            .pipe(
                EnsureLength(this.InternalServerException, 1, 1),
                map(res => res[0][0].provider_id)
            );
    }
    public revokeRole(roleId: number, userId: number): Observable<void> {
        return this.dataLayer.revokeRole(roleId, userId)
            .pipe(
                map(() => {})
            );
    }
    public upsertRole(id: number | undefined, name: string, defaultRole: boolean, description: string): Observable<number> {
        return this.dataLayer.upsertRole(id, name, defaultRole === true ? 'Y' : 'N', description)
            .pipe(
                EnsureLength(this.InternalServerException, 1, 1),
                map(res => res[0][0].role_id)
            );
    }
}