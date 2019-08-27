import { CharacterInterface } from '../../../../service-references';

export class Attribute {
    id: number;
    descriptionId: number;
    name: string;
    short: string;

    public constructor(attr: CharacterInterface.Types.Attribute) {
        this.id = attr.attribute_id;
        this.descriptionId = attr.description_id;
        this.name = attr.attribute_name;
        this.short = attr.attribute_short;
    }
}