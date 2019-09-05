import { SophontSkill } from './Sophont.Skill';
import { SophontAttribute } from './Sophont.Attribute';

export interface Sophont {
    id: number;
    name: string;
    descriptionId: number;
    playable: boolean;
    attributes: SophontAttribute[];
    skills: SophontSkill[]
}