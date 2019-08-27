import { injectable, inject } from 'inversify';
import { EnvironmentInterface, DataLayer } from '../../../service-references';
import { Symbols } from '../../../symbols';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnvironmentAdminService } from '../../../public/environment-service/public';

@injectable()
export class EnvironmentAdminServiceImpl implements EnvironmentAdminService {

    private dataLayer: EnvironmentInterface.Procedures;
    
    public constructor(
        @inject(Symbols.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<EnvironmentInterface.Procedures>
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
                map(res => res[0][0].id)
            )
    }
}