import { MonoTypeOperatorFunction, throwError, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { interfaces } from 'inversify';
import { Exception } from '../../service-references/azimuth-exceptions';

export function EnsureLength(
    error: interfaces.Newable<Exception>,
    outer: number, 
    ...inners:number[]
): MonoTypeOperatorFunction<any[][]> {
    return res$ => res$.pipe(
        mergeMap(res => {
            if(outer < inners.length) {
                return throwError(new Error());
            }
            if(res.length !== outer) {
                return throwError(new error())
            }
            try {
                inners.forEach((inner, index) => {
                    if(res[index].length !== inner) {
                        throw new Error();
                    }
                });
            } catch(e) {
                return throwError(new error());
            }
            
            return of(res);
        })
    )
}