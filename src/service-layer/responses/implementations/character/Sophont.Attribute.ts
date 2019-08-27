import { CharacterInterface } from '../../../../service-references';

export class SophontAttribute {
    sophontId: number;
    attributeId: number;
    modifier: number;

    public constructor(attr: CharacterInterface.Types.SophontAttribute) {
        this.sophontId = attr.sophont_id;
        this.attributeId = attr.attribute_id;
        this.modifier = attr.attribute_modifier;
    }
}