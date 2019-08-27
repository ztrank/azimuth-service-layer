import { injectable, inject } from 'inversify';
import { EnvironmentInterface, DataLayer } from '../../../service-references';
import { Symbols } from '../../../symbols';
import { Observable } from 'rxjs';
import { Condition } from '../../responses/implementations/environment/Condition';
import { map } from 'rxjs/operators';
import { EnvironmentService } from '../../../public/environment-service/public';

@injectable()
export class EnvironmentServiceImpl implements EnvironmentService {

    private dataLayer: EnvironmentInterface.Procedures;
    
    public constructor(
        @inject(Symbols.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<EnvironmentInterface.Procedures>
    ) {
        this.dataLayer = dataLayerFactory('environment_interface');
    }

    public getConditions(): Observable<Condition[]> {
        return this.dataLayer.getConditions()
            .pipe(
                map(res => res[0].map(r => new Condition(r)))
            )
    }
}