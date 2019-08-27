import { Role } from './Role';
import { AuthInterface } from '../../../../service-references';

export class User {
    id: number;
    username: string;
    active: boolean;
    roles?: Role[];

    public constructor(user: AuthInterface.Types.User, roles?: AuthInterface.Types.Role[]) {
        this.id = user.user_id;
        this.username = user.user_name;
        this.active = user.active_flag === 'Y' ? true : false;
        this.roles = roles ? roles.map(r => new Role(r)) : [];
    }
}