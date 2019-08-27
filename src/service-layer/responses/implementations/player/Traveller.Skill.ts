import { PlayerInterface } from '../../../../service-references';

export class TravellerSkill {
    travellerId: number;
    skillId: number;
    ranks: number;

    public constructor(skill: PlayerInterface.Types.TravellerSkill) {
        this.travellerId = skill.traveller_id;
        this.skillId = skill.skill_id;
        this.ranks = skill.ranks;
    }
}