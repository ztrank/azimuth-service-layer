import { injectable, inject, interfaces } from 'inversify';
import { EnvironmentInterface, DataLayer } from '../../../service-references';
import { Observable } from 'rxjs';
import { Condition } from '../../responses/implementations/environment/Condition';
import { map } from 'rxjs/operators';
import { EnvironmentService } from '../../../public/environment-service/public';
import { HttpExceptions, Exception } from '../../../service-references/azimuth-exceptions';
import { EnsureLength } from '../../operators/ensure.length';
import { TYPES } from '../../../service-references/azimuth-types';

@injectable()
export class EnvironmentServiceImpl implements EnvironmentService {

    private dataLayer: EnvironmentInterface.Procedures;
    
    public constructor(
        @inject(TYPES.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<EnvironmentInterface.Procedures>,
        @inject(HttpExceptions.InternalServerException) private InternalServerException: interfaces.Newable<Exception>,
        @inject(HttpExceptions.NotFoundException) private NotFoundException: interfaces.Newable<Exception>
    ) {
        this.dataLayer = dataLayerFactory('environment_interface');
    }

    public getConditions(): Observable<Condition[]> {
        return this.dataLayer.getConditions()
            .pipe(
                EnsureLength(this.InternalServerException, 1),
                map(res => res[0].map(r => new Condition(r)))
            )
    }

    public getCondition(conditionId: number): Observable<Condition> {
        return this.dataLayer.getCondition(conditionId)
            .pipe(
                EnsureLength(this.NotFoundException, 1, 1),
                map(res => new Condition(res[0][0]))
            )
    }
}