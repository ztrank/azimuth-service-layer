import { Container } from 'inversify';
import { Symbols } from './symbols';
import { AuthAdminServiceImpl } from './service-layer/services/implementations/Auth.Admin.Service';
import { AuthServiceImpl } from './service-layer/services/implementations/Auth.Service';
import { CharacterAdminServiceImpl } from './service-layer/services/implementations/Character.Admin.Service';
import { CharacterServiceImpl } from './service-layer/services/implementations/Character.Service';
import { EnvironmentAdminServiceImpl } from './service-layer/services/implementations/Environment.Admin.Service';
import { EnvironmentServiceImpl } from './service-layer/services/implementations/Environment.Service';
import { TravellerServiceImpl } from './service-layer/services/implementations/Traveller.Service';
import { AuthServices } from './public/auth-service/public';
import { CharacterServices } from './public/character-service/public';
import { EnvironmentServices } from './public/environment-service/public';
import { PlayerServices } from './public/player-service/public';



export function Bind(
    container: Container,
    dataLayerBinding: string | symbol,
    contextBinding: string | symbol
): void {

    container.bind(Symbols.DataLayerFactory).toService(dataLayerBinding);
    container.bind(Symbols.HttpContext).toService(contextBinding);
    container.bind(AuthServices.AuthAdminService).to(AuthAdminServiceImpl);
    container.bind(AuthServices.AuthService).to(AuthServiceImpl);
    container.bind(CharacterServices.CharacterAdminService).to(CharacterAdminServiceImpl);
    container.bind(CharacterServices.CharacterService).to(CharacterServiceImpl);
    container.bind(EnvironmentServices.EnvironmentAdminService).to(EnvironmentAdminServiceImpl);
    container.bind(EnvironmentServices.EnvironmentService).to(EnvironmentServiceImpl);
    container.bind(PlayerServices.TravellerService).to(TravellerServiceImpl);
    
}