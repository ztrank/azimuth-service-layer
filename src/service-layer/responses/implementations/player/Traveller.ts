import { Name } from '../../../../public/player-service/public';
import { TravellerSkill } from './Traveller.Skill';
import { TravellerAttribute } from './Traveller.Attribute';
import { PlayerInterface } from '../../../../service-references';
export class Traveller {
    id: number;
    userId: number;
    sophontId: number;
    name: Name;
    attributes: TravellerAttribute[];
    skills: TravellerSkill[];

    public constructor(trav: PlayerInterface.Types.Traveller, attrs: PlayerInterface.Types.TravellerAttribute[], skills: PlayerInterface.Types.TravellerSkill[]) {
        this.id = trav.traveller_id;
        this.userId = trav.user_id;
        this.sophontId = trav.sophont_id;
        this.attributes = attrs.filter(a => a.traveller_id === this.id).map(a => new TravellerAttribute(a));
        this.skills = skills.filter(s => s.traveller_id === this.id).map(s => new TravellerSkill(s));
        this.name = {
            first: trav.traveller_first_name,
            last: trav.traveller_last_name,
            nickname: trav.traveller_nick_name
        };
    }
}