import { ContainerModule } from 'inversify';
import { AuthAdminServiceImpl } from './service-layer/services/implementations/Auth.Admin.Service';
import { AuthServiceImpl } from './service-layer/services/implementations/Auth.Service';
import { CharacterAdminServiceImpl } from './service-layer/services/implementations/Character.Admin.Service';
import { CharacterServiceImpl } from './service-layer/services/implementations/Character.Service';
import { EnvironmentAdminServiceImpl } from './service-layer/services/implementations/Environment.Admin.Service';
import { EnvironmentServiceImpl } from './service-layer/services/implementations/Environment.Service';
import { TravellerServiceImpl } from './service-layer/services/implementations/Traveller.Service';
import { TYPES } from './service-references/azimuth-types';
import { MediaServiceImpl } from './service-layer/services/implementations/Media.Service';

export const ServiceLayerModule = new ContainerModule(bind => {
    bind(TYPES.AuthAdminService).to(AuthAdminServiceImpl);
    bind(TYPES.AuthService).to(AuthServiceImpl);
    bind(TYPES.CharacterAdminService).to(CharacterAdminServiceImpl);
    bind(TYPES.CharacterService).to(CharacterServiceImpl);
    bind(TYPES.EnvironmentAdminService).to(EnvironmentAdminServiceImpl);
    bind(TYPES.EnvironmentService).to(EnvironmentServiceImpl);
    bind(TYPES.TravellerService).to(TravellerServiceImpl);
    bind(TYPES.MediaService).to(MediaServiceImpl);
});