import { PlayerInterface } from '../../../../service-references';

export class TravellerAttribute {
    travellerId: number;
    attributeId: number;
    base: number;
    value: number;

    public constructor(attr: PlayerInterface.Types.TravellerAttribute) {
        this.attributeId = attr.attribute_id;
        this.travellerId = attr.traveller_id;
        this.base = attr.attribute_base_value;
        this.value = attr.attribute_value;
    }
}