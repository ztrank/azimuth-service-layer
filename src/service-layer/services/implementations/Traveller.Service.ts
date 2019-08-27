import { injectable, inject } from 'inversify';
import { TravellerService } from '../../../public/player-service/public';
import { PlayerInterface, DataLayer } from '../../../service-references';
import { Symbols } from '../../../symbols';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Traveller } from '../../responses/implementations/player/Traveller';

@injectable()
export class TravellerServiceImpl implements TravellerService {
    private dataLayer: PlayerInterface.Procedures;
    
    public constructor(
        @inject(Symbols.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<PlayerInterface.Procedures>,
        @inject(Symbols.UserId) private userId: number
    ) {
        this.dataLayer = dataLayerFactory('player_interface');
    }

    public getMyTravellers(): Observable<Traveller[]> {
        return this.dataLayer.getMyTravellers(this.userId)
            .pipe(
                map(res => res[0].map(r => new Traveller(r)))
            );
    }

    public getTraveller(travellerId: number): Observable<Traveller> {
        return this.dataLayer.getTraveller(this.userId, travellerId)
            .pipe(
                map(res => new Traveller(res[0][0], res[2], res[1]))
            );
    }

    public upsertTravellerAttribute(travellerId: number, attributeId: number, baseValue: number, value: number): Observable<void> {
        return this.dataLayer.upsertTravellerAttribute(this.userId, travellerId, attributeId, baseValue, value)
            .pipe(
                map(() => {})
            );
    }

    public upsertTravellerSkill(travellerId: number, skillId: number, ranks: number): Observable<void> {
        return this.dataLayer.upsertTravellerSkill(this.userId, travellerId, skillId, ranks)
            .pipe(
                map(() => {})
            );
    }

    public upsertTraveller(
        travellerId: number | undefined,
        sophontId: number,
        firstName: string,
        lastName: string,
        nickName: string
    ): Observable<number> {
        return this.dataLayer.upsertTraveller(this.userId, travellerId, this.userId, sophontId, firstName, lastName, nickName)
            .pipe(
                map(res => res[0][0].id)
            );
    }
}