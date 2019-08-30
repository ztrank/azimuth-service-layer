import { Observable } from 'rxjs';
import { Condition } from '../interfaces/Condition';

export interface EnvironmentService {
    getConditions(): Observable<Condition[]>;
    getCondition(conditionId: number): Observable<Condition>;
}