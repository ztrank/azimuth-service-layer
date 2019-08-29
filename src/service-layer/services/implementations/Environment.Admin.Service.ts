import { injectable, inject, interfaces } from 'inversify';
import { EnvironmentInterface, DataLayer } from '../../../service-references';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnvironmentAdminService } from '../../../public/environment-service/public';
import { EnsureLength } from '../../operators/ensure.length';
import { HttpExceptions, Exception } from '../../../service-references/azimuth-exceptions';
import { TYPES } from '../../../service-references/azimuth-types';

@injectable()
export class EnvironmentAdminServiceImpl implements EnvironmentAdminService {

    private dataLayer: EnvironmentInterface.Procedures;
    
    public constructor(
        @inject(TYPES.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<EnvironmentInterface.Procedures>,
        @inject(HttpExceptions.NotFoundException) private NotFoundException: interfaces.Newable<Exception>
    ) {
        this.dataLayer = dataLayerFactory('environment_interface');
    }

    public deleteCondition(conditionId: number): Observable<void> {
        return this.dataLayer.deleteCondition(conditionId)
            .pipe(
                map(() => {})
            )
    }
    public upsertCondition(id: number | undefined, name: string, decription: string): Observable<number> {
        return this.dataLayer.upsertCondition(id, name, decription)
            .pipe(
                EnsureLength(this.NotFoundException, 1, 1),
                map(res => res[0][0].id)
            )
    }
}