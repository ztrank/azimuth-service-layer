import { AuthInterface } from '../../../../service-references';

export class Role {
    id: number;
    name: string;
    descriptionId?: number;

    public constructor(role: AuthInterface.Types.Role) {
        this.id = role.role_id;
        this.name = role.role_name;
        this.descriptionId = role.description_id;
    }
}