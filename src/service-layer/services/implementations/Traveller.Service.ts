import { injectable, inject, interfaces } from 'inversify';
import { TravellerService } from '../../../public/player-service/public';
import { PlayerInterface, DataLayer } from '../../../service-references';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Traveller } from '../../responses/implementations/player/Traveller';
import { HttpContext } from '../../../service-references/azimuth-http';
import { HttpExceptions, Exception } from '../../../service-references/azimuth-exceptions';
import { EnsureLength } from '../../operators/ensure.length';
import { TYPES } from '../../../service-references/azimuth-types';

@injectable()
export class TravellerServiceImpl implements TravellerService {
    private dataLayer: PlayerInterface.Procedures;
    
    public constructor(
        @inject(TYPES.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<PlayerInterface.Procedures>,
        @inject(TYPES.HttpContext) private context: HttpContext,
        @inject(HttpExceptions.NotFoundException) private NotFoundException: interfaces.Newable<Exception>
    ) {
        this.dataLayer = dataLayerFactory('player_interface');
    }

    public getMyTravellers(): Observable<Traveller[]> {
        return this.dataLayer.getMyTravellers(<number>this.context.CurrentUser.id)
            .pipe(
                EnsureLength(this.NotFoundException, 1),
                map(res => res[0].map(r => new Traveller(r)))
            );
    }

    public getTraveller(travellerId: number): Observable<Traveller> {
        return this.dataLayer.getTraveller(<number>this.context.CurrentUser.id, travellerId)
            .pipe(
                EnsureLength(this.NotFoundException, 2, 1),
                map(res => new Traveller(res[0][0], res[2], res[1]))
            );
    }

    public upsertTravellerAttribute(travellerId: number, attributeId: number, baseValue: number, value: number): Observable<void> {
        return this.dataLayer.upsertTravellerAttribute(<number>this.context.CurrentUser.id, travellerId, attributeId, baseValue, value)
            .pipe(
                map(() => {})
            );
    }

    public upsertTravellerSkill(travellerId: number, skillId: number, ranks: number): Observable<void> {
        return this.dataLayer.upsertTravellerSkill(<number>this.context.CurrentUser.id, travellerId, skillId, ranks)
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
        return this.dataLayer.upsertTraveller(<number>this.context.CurrentUser.id, travellerId, <number>this.context.CurrentUser.id, sophontId, firstName, lastName, nickName)
            .pipe(
                EnsureLength(this.NotFoundException, 1, 1),
                map(res => res[0][0].id)
            );
    }
}