import { CharacterAdminService } from '../../../public/character-service/public';
import { injectable, inject, interfaces } from 'inversify';
import { CharacterInterface, DataLayer } from '../../../service-references';
import { Symbols } from '../../../symbols';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exception, HttpExceptions } from '../../../service-references/azimuth-exceptions';
import { EnsureLength } from '../../operators/ensure.length';

@injectable()
export class CharacterAdminServiceImpl implements CharacterAdminService {
    private dataLayer: CharacterInterface.Procedures;
    
    public constructor(
        @inject(Symbols.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<CharacterInterface.Procedures>,
        @inject(HttpExceptions.InternalServerException) private InternalServerException: interfaces.Newable<Exception>
    ) {
        this.dataLayer = dataLayerFactory('character_interface');
    }

    public assignSophontAttribute(sophontId: number, attributeId: number, modifier: number): Observable<void> {
        return this.dataLayer.assignSophontAttribute(sophontId, attributeId, modifier)
            .pipe(
                map(() => {})
            );
    }

    public assignSophontSkill(sophontId: number, skillId: number, skillModifier: number, normallyOn: boolean, onConditionId: number, offConditionId: number): Observable<void> {
        return this.dataLayer.assignSophontSkill(sophontId, skillId, skillModifier, normallyOn ? 'ON' : 'OFF', onConditionId, offConditionId)
            .pipe(
                map(() => {})
            );
    }

    public deleteAttribute(attributeId: number): Observable<void> {
        return this.dataLayer.deleteAttribute(attributeId)
            .pipe(
                map(() => {})
            );
    }

    public deleteSkillGroup(skillGroupId: number): Observable<void> {
        return this.dataLayer.deleteSkillGroup(skillGroupId)
            .pipe(
                map(() => {})
            );
    }

    public deleteSkill(skillId: number): Observable<void> {
        return this.dataLayer.deleteSkill(skillId)
            .pipe(
                map(() => {})
            );
    }

    public upsertAttribute(id: number | undefined, name: string, short: string, description: string): Observable<number> {
        return this.dataLayer.upsertAttribute(id, name, short, description)
            .pipe(
                EnsureLength(this.InternalServerException, 1, 1),
                map(res => res[0][0].id)
            );
    }

    public upsertSkillGroup(id: number | undefined, name: string, description: string): Observable<number> {
        return this.dataLayer.upsertSkillGroup(id, name, description)
            .pipe(
                EnsureLength(this.InternalServerException, 1, 1),
                map(res => res[0][0].id)
            );
    }

    public upsertSkill(id: number | undefined, groupId: number, name: string, description: string): Observable<number> {
        return this.dataLayer.upsertSkill(id, groupId, name, description)
            .pipe(
                EnsureLength(this.InternalServerException, 1, 1),
                map(res => res[0][0].id)
            );
    }

    public upsertSophont(id: number | undefined, name: string, playable: boolean, description: string): Observable<number> {
        return this.dataLayer.upsertSophont(id, name, playable ? 'Y' : 'N', description)
            .pipe(
                EnsureLength(this.InternalServerException, 1, 1),
                map(res => res[0][0].id)
            );
    }

}