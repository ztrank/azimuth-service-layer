import { injectable, inject, interfaces } from 'inversify';
import { TYPES } from '../../../service-references/azimuth-types';
import { HttpExceptions, Exception } from '../../../service-references/azimuth-exceptions';
import { DataLayer, MediaInterface } from '../../../service-references';
import { DescriptionService } from '../../../public/media-service/public/services/Description.Service';
import { Observable } from 'rxjs';
import { Description } from '../../responses/implementations/media/Description';
import { EnsureLength } from '../../operators/ensure.length';
import { map } from 'rxjs/operators';

@injectable()
export class MediaServiceImpl implements DescriptionService {

    private dataLayer: MediaInterface.Procedures;

    public constructor(
        @inject(TYPES.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<MediaInterface.Procedures>,
        @inject(HttpExceptions.NotFoundException) private NotFoundException: interfaces.Newable<Exception>
    ) {
        this.dataLayer = dataLayerFactory('media_interface');
    }

    getDescription(descriptionId: number): Observable<Description> {
        return this.dataLayer.getDescription(descriptionId)
            .pipe(
                EnsureLength(this.NotFoundException, 1, 1),
                map(r => new Description(r[0][0]))
            );
    }
}