import { AuthInterface } from '../../../../service-references';

export class Provider {
    id: number;
    name: string;

    public constructor(provider: AuthInterface.Types.Provider) {
        this.id = provider.provider_id;
        this.name = provider.provider_name;
    }
}