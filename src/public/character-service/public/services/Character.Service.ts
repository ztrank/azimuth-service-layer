import { Observable } from 'rxjs';
import { Attribute } from '../interfaces/Attribute';
import { Skill } from '../interfaces/Skill';
import { Sophont } from '../interfaces/Sophont';
import { SkillGroup } from '../interfaces/Skill.Group';

export interface CharacterService {
    findAttribute(attributeShort: string): Observable<Attribute>;
    getAttributes(): Observable<Attribute[]>;
    getAttribute(attributeId: number): Observable<Attribute>;
    getSkill(skillId: number): Observable<Skill>;
    getSkills(): Observable<Skill[]>;
    getSkillGroups(): Observable<SkillGroup[]>;
    getSkillGroup(skillGroupId: number): Observable<SkillGroup>;
    getSophont(sophontId: number): Observable<Sophont>;
    getSophonts(): Observable<Sophont[]>;
}