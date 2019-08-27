import { Observable } from 'rxjs';

export interface CharacterAdminService {
    assignSophontAttribute(sophontId: number, attributeId: number, modifier: number): Observable<void>;
    assignSophontSkill(sophontId: number, skillId: number, skillModifier: number, normallyOn: boolean, onConditionId: number, offConditionId: number): Observable<void>;
    deleteAttribute(attributeId: number): Observable<void>;
    deleteSkillGroup(skillGroupId: number): Observable<void>;
    deleteSkill(skillId: number): Observable<void>;
    upsertAttribute(id: number | undefined, name: string, short: string, description: string): Observable<number>;
    upsertSkillGroup(id: number | undefined, name: string, description: string): Observable<number>;
    upsertSkill(id: number | undefined, groupId: number, name: string, description: string): Observable<number>;
    upsertSophont(id: number | undefined, name: string, playable: boolean, description: string): Observable<number>;
}