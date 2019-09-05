import { Observable } from 'rxjs';

export interface Procedures {
    getMyTravellers(executingUserId: number): Observable<Responses.Travellers>;
    getTraveller(executingUserId: number, travellerId: number): Observable<Responses.Traveller>;
    upsertTravellerAttribute(executingUserId: number, travellerId: number, attributeId: number, baseValue: number, value: number): Observable<Responses.Void>;
    upsertTravellerSkill(executingUserId: number, travellerId: number, skillId: number, ranks: number): Observable<Responses.Void>;
    upsertTraveller(
        executingUserId: number,
        travellerId: number | undefined,
        userId: number,
        sophontId: number,
        firstName: string,
        lastName: string,
        nickName: string
    ): Observable<Responses.Id>;
}

export namespace Responses {
    export type Void = [];
    export type Id = [Types.Id[]];
    export type Traveller = [Types.Traveller[], Types.TravellerSkill[], Types.TravellerAttribute[]];
    export type Travellers = [Types.Traveller[], Types.TravellerSkill[], Types.TravellerAttribute[]];
}

export namespace Types {
    export interface Id {
        id: number;
    }

    export interface Traveller {
        traveller_id: number;
        user_id: number;
        sophont_id: number;
        traveller_first_name: string;
        traveller_last_name: string;
        traveller_nick_name: string;
    }

    export interface TravellerSkill {
        traveller_id: number;
        skill_id: number;
        ranks: number;
    }

    export interface TravellerAttribute {
        traveller_id: number;
        attribute_id: number;
        attribute_value: number;
        attribute_base_value: number;
    }

}