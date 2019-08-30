import { Observable } from 'rxjs';

export interface Procedures {
    getDescription(descriptionId: number): Observable<Responses.Description>;
}


export namespace Responses {
    export type Void = [];
    export type Id = [Types.Id[]];
    export type Description = [Types.Description[]];
}

export namespace Types {
    export interface Id {
        id: number;
    }

    export interface Description {
        description_id: number;
        description_value: string;
    }
}