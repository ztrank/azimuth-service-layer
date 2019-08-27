import { EnvironmentService } from './Environment.Service';
import { Observable } from 'rxjs';

export interface EnvironmentAdminService extends EnvironmentService {
    deleteCondition(conditionId: number): Observable<void>;
    upsertCondition(id: number | undefined, name: string, decription: string): Observable<number>;
}