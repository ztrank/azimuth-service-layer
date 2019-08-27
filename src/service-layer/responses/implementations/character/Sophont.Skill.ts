import { CharacterInterface } from '../../../../service-references';

export class SophontSkill {
    sophontId: number;
    skillId: number;
    modifier: number;
    onConditionId: number;
    offConditionId: number;
    normallyOn: boolean;

    public constructor(skill: CharacterInterface.Types.SophontSkill) {
        this.sophontId = skill.sophont_id;
        this.skillId = skill.skill_id;
        this.modifier = skill.skill_modifier;
        this.offConditionId = skill.off_condition_id;
        this.onConditionId = skill.on_condition_id;
        this.normallyOn = skill.normally_on_off === 'ON' ? true : false;
    }
}