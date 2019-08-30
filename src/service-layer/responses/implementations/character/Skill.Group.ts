import { CharacterInterface } from '../../../../service-references';

export class SkillGroup {
    id: number;
    descriptionId: number;
    name: string;

    public constructor(grp: CharacterInterface.Types.SkillGroup) {
        this.id = grp.skill_group_id;
        this.descriptionId = grp.description_id;
        this.name = grp.skill_group_name;
    }
}