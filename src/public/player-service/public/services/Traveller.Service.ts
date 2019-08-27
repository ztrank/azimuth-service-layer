import { Observable } from 'rxjs';
import { Traveller } from '../interfaces/Traveller';

export interface TravellerService {
    getMyTravellers(): Observable<Traveller[]>;
    getTraveller(travellerId: number): Observable<Traveller>;
    upsertTravellerAttribute(travellerId: number, attributeId: number, baseValue: number, value: number): Observable<void>;
    upsertTravellerSkill(travellerId: number, skillId: number, ranks: number): Observable<void>;
    upsertTraveller(
        travellerId: number | undefined,
        sophontId: number,
        firstName: string,
        lastName: string,
        nickName: string
    ): Observable<number>;
}