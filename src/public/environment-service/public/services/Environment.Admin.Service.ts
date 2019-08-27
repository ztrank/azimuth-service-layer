import { Observable } from 'rxjs';

export interface EnvironmentAdminService {
    deleteCondition(conditionId: number): Observable<void>;
    upsertCondition(id: number | undefined, name: string, decription: string): Observable<number>;
}