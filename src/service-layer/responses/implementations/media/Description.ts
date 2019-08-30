import { MediaInterface } from '../../../../service-references';

export class Description {
    id: number;
    value: string;

    public constructor(desc: MediaInterface.Types.Description) {
        this.id = desc.description_id;
        this.value = desc.description_value;
    }
}