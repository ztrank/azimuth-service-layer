import { injectable, inject, interfaces } from 'inversify';
import { EnvironmentInterface, DataLayer } from '../../../service-references';
import { Symbols } from '../../../symbols';
import { Observable } from 'rxjs';
import { Condition } from '../../responses/implementations/environment/Condition';
import { map } from 'rxjs/operators';
import { EnvironmentService } from '../../../public/environment-service/public';
import { HttpExceptions, Exception } from '../../../service-references/azimuth-exceptions';
import { EnsureLength } from '../../operators/ensure.length';

@injectable()
export class EnvironmentServiceImpl implements EnvironmentService {

    private dataLayer: EnvironmentInterface.Procedures;
    
    public constructor(
        @inject(Symbols.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<EnvironmentInterface.Procedures>,
        @inject(HttpExceptions.InternalServerException) private InternalServerException: interfaces.Newable<Exception>
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
}