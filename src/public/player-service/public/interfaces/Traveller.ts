import { TravellerAttribute } from './Traveller.Attribute';
import { TravellerSkill } from './Traveller.Skill';

export interface Name {
    first: string;
    last: string;
    nickname: string;
}

export interface Traveller {
    id: number;
    userId: number;
    sophontId: number;
    name: Name;
    attributes?: TravellerAttribute[];
    skills?: TravellerSkill[];
}