import { CharacterInterface } from '../../../../service-references';

export class Skill {
    id: number;
    groupId?: number;
    descriptionId?: number;
    groupDescriptionId?: number;
    groupName: string;
    name: string;
    fullName: string;

    public constructor(skill: CharacterInterface.Types.Skill) {
        this.id = skill.skill_id;
        this.groupId = skill.skill_group_id;
        this.descriptionId = skill.skill_description_id;
        this.groupDescriptionId = skill.skill_group_description_id;
        this.groupName = skill.skill_group_name;
        this.name = skill.skill_name;
        this.fullName = skill.skill_full_name;
    }
}