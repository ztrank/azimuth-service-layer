import { Observable } from 'rxjs';
import { Description } from '../interfaces/Description';

export interface DescriptionService {
    getDescription(id: number): Observable<Description>;
}