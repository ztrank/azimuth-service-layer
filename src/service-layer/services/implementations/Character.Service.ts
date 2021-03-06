import { injectable, inject, interfaces } from 'inversify';
import { CharacterService } from '../../../public/character-service/public';
import { CharacterInterface, DataLayer } from '../../../service-references';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Attribute } from '../../responses/implementations/character/Attribute';
import { Skill } from '../../responses/implementations/character/Skill';
import { Sophont } from '../../responses/implementations/character/Sophont';
import { Exception, HttpExceptions } from '../../../service-references/azimuth-exceptions';
import { EnsureLength } from '../../operators/ensure.length';
import { TYPES } from '../../../service-references/azimuth-types';
import { SkillGroup } from '../../responses/implementations/character/Skill.Group';

@injectable()
export class CharacterServiceImpl implements CharacterService {

    private dataLayer: CharacterInterface.Procedures;
    
    public constructor(
        @inject(TYPES.DataLayerFactory) dataLayerFactory: DataLayer.DataLayerFactory<CharacterInterface.Procedures>,
        @inject(HttpExceptions.NotFoundException) private NotFoundException: interfaces.Newable<Exception>,
        @inject(HttpExceptions.InternalServerException) private InternalServerException: interfaces.Newable<Exception>
    ) {
        this.dataLayer = dataLayerFactory('character_interface');
    }

    public findAttribute(attributeShort: string): Observable<Attribute> {
        return this.dataLayer.findAttribute(attributeShort)
            .pipe(
                EnsureLength(this.NotFoundException, 1, 1),
                map(res => new Attribute(res[0][0]))
            );
    }
    public getAttributes(): Observable<Attribute[]> {
        return this.dataLayer.getAttributes()
            .pipe(
                EnsureLength(this.InternalServerException, 1),
                map(res => res[0].map(r => new Attribute(r)))
            );
    }

    public getAttribute(attributeId: number): Observable<Attribute> {
        return this.dataLayer.getAttribute(attributeId)
            .pipe(
                EnsureLength(this.NotFoundException, 1, 1),
                map(r => new Attribute(r[0][0]))
            );
    }
    public getSkillGroups(): Observable<SkillGroup[]> {
        return this.dataLayer.getSkillGroups()
            .pipe(
                EnsureLength(this.InternalServerException, 1),
                map(res => res[0].map(r => new SkillGroup(r)))
            )
    }
    public getSkillGroup(skillGroupId: number): Observable<SkillGroup> {
        return this.dataLayer.getSkillGroup(skillGroupId)
            .pipe(
                EnsureLength(this.InternalServerException, 1, 1),
                map(res => new SkillGroup(res[0][0]))
            )
    }
    public getSkill(skillId: number): Observable<Skill> {
        return this.dataLayer.getSkill(skillId)
            .pipe(
                EnsureLength(this.NotFoundException, 1, 1),
                map(res => new Skill(res[0][0]))
            );
    }
    public getSkills(): Observable<Skill[]> {
        return this.dataLayer.getSkills()
            .pipe(
                EnsureLength(this.InternalServerException, 1),
                map(res => res[0].map(s => new Skill(s)))
            );
    }
    public getSophont(sophontId: number): Observable<Sophont> {
        return this.dataLayer.getSophont(sophontId)
            .pipe(
                EnsureLength(this.NotFoundException, 3, 1),
                map(res => new Sophont(res[0][0], res[1], res[2]))
            );
    }
    public getSophonts(): Observable<Sophont[]> {
        return this.dataLayer.getSophonts()
            .pipe(
                EnsureLength(this.InternalServerException, 3),
                map(res => res[0].map(r => new Sophont(r, res[1], res[2])))
            );
    }
}