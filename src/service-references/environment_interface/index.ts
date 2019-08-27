import { Observable } from 'rxjs';

export interface Procedures {
    deleteCondition(conditionId: number): Observable<Responses.Void>;
    getConditions(): Observable<Responses.Condition>;
    upsertCondition(id: number | undefined, name: string, decription: string): Observable<Responses.Id>;
}

export namespace Responses {
    export type Void = [];
    export type Id = [Types.Id[]];
    export type Condition = [Types.Condition[]];
}

export namespace Types {
    export interface Id {
        id: number;
    }

    export interface Condition {
        condition_id: number;
        description_id: number;
        condition_name: string;
    }
}