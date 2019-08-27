import { Observable } from 'rxjs';
import { Traveller } from '../interfaces/Traveller';

export interface TravellerService {
    getMyTravellers(executingUserId: number): Observable<Traveller[]>;
    getTraveller(executingUserId: number, travellerId: number): Observable<Traveller>;
    upsertTravellerAttribute(executingUserId: number, travellerId: number, attributeId: number, baseValue: number, value: number): Observable<void>;
    upsertTravellerSkill(executingUserId: number, travellerId: number, skillId: number, ranks: number): Observable<void>;
    upsertTraveller(
        executingUserId: number,
        travellerId: number | undefined,
        userId: number,
        sophontId: number,
        firstName: string,
        lastName: string,
        nickName: string
    ): Observable<number>;
}