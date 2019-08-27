import { Observable } from 'rxjs';
import { Attribute } from '../interfaces/Attribute';
import { Skill } from '../interfaces/Skill';
import { Sophont } from '../interfaces/Sophont';

export interface CharacterService {
    findAttribute(attributeShort: string): Observable<Attribute>;
    getAttributes(): Observable<Attribute[]>;
    getSkill(skillId: number): Observable<Skill>;
    getSkills(): Observable<Skill[]>;
    getSophont(sophontId: number): Observable<Sophont>;
    getSophonts(): Observable<Sophont[]>;
}