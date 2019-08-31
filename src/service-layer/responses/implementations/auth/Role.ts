import { AuthInterface } from '../../../../service-references';

export class Role {
    id: number;
    name: string;
    descriptionId?: number;
    isDefault: boolean;

    public constructor(role: AuthInterface.Types.Role) {
        this.id = role.role_id;
        this.name = role.role_name;
        this.descriptionId = role.description_id;
        this.isDefault = role.role_default_flag === 'Y' ? true : false;
    }
}