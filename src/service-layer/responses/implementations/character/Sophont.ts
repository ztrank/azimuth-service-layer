import { SophontAttribute } from './Sophont.Attribute';
import { SophontSkill } from './Sophont.Skill';
import { CharacterInterface } from '../../../../service-references';

export class Sophont {
    id: number;
    name: string;
    descriptionId: number;
    playable: boolean;
    attributes: SophontAttribute[];
    skills: SophontSkill[];

    public constructor(soph: CharacterInterface.Types.Sophont, attrs: CharacterInterface.Types.SophontAttribute[], skills: CharacterInterface.Types.SophontSkill[]) {
        this.id = soph.sophont_id;
        this.name = soph.sophont_name;
        this.descriptionId = soph.description_id;
        this.playable = soph.sophont_playable_flag === 'Y' ? true : false;
        this.attributes = attrs.filter(a => a.sophont_id === this.id).map(a => new SophontAttribute(a));
        this.skills = skills.filter(a => a.sophont_id === this.id).map(s => new SophontSkill(s));
    }
}