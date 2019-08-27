import { Observable } from 'rxjs';


export interface Procedures {
    assignSophontAttribute(sophontId: number, attributeId: number, modifier: number): Observable<Responses.Void>;
    assignSophontSkill(sophontId: number, skillId: number, skillModifier: number, normallyOn: 'ON' | 'OFF', onConditionId: number, offConditionId: number): Observable<Responses.Void>;
    deleteAttribute(attributeId: number): Observable<Responses.Void>;
    deleteSkillGroup(skillGroupId: number): Observable<Responses.Void>;
    deleteSkill(skillId: number): Observable<Responses.Void>;
    findAttribute(attributeShort: string): Observable<Responses.Attributes>;
    getAttributes(): Observable<Responses.Attributes>;
    getSkill(skillId: number): Observable<Responses.Skills>;
    getSkills(): Observable<Responses.Skills>;
    getSophont(sophontId: number): Observable<Responses.Sophont>;
    getSophonts(): Observable<Responses.Sophonts>;
    upsertAttribute(id: number | undefined, name: string, short: string, description: string): Observable<Responses.Id>;
    upsertSkillGroup(id: number | undefined, name: string, description: string): Observable<Responses.Id>;
    upsertSkill(id: number | undefined, groupId: number, name: string, description: string): Observable<Responses.Id>;
    upsertSophont(id: number | undefined, name: string, playable: 'Y' | 'N', description: string): Observable<Responses.Id>;
}

export namespace Responses {
    export type Void = [];
    export type Attributes = [Types.Attribute[]];
    export type Skills = [Types.Skill[]];
    export type Sophont = [Types.Sophont[], Types.SophontAttribute[], Types.SophontSkill[]];
    export type Sophonts = [Types.Sophont[]];
    export type Id = [Types.Id[]];
}

export namespace Types {
    
    export interface Attribute {
        attribute_id: number;
        description_id: number;
        attribute_name: string;
        attribute_short: string;
    }

    export interface Skill {
        skill_id: number;
        skill_group_id: number;
        skill_description_id: number;
        skill_group_description_id: number;
        skill_full_name: string;
        skill_group_name: string;
        skill_name: string;
    }

    export interface Sophont {
        sophont_id: number;
        description_id: number;
        sophont_name: string;
        sophont_playable_flag: 'Y' | 'N';
    }

    export interface SophontAttribute {
        sophont_id: number;
        attribute_id: number;
        attribute_modifier: number;
    }

    export interface SophontSkill {
        sophont_id: number;
        skill_id: number;
        skill_modifier: number;
        on_condition_id: number;
        off_condition_id: number;
        normally_on_off: 'ON' | 'OFF';
    }

    export interface Id {
        id: number;
    }
}