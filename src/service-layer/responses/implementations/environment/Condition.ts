import { EnvironmentInterface } from '../../../../service-references';

export class Condition {
    id: number;
    descriptionId: number;
    name: string;

    public constructor(cond: EnvironmentInterface.Types.Condition) {
        this.id = cond.condition_id;
        this.descriptionId = cond.description_id;
        this.name = cond.condition_name;
    }
}