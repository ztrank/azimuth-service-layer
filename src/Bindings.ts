import { Container } from 'inversify';
import { Symbols } from './symbols';
import { AuthAdminServiceImpl } from './service-layer/services/implementations/Auth.Admin.Service';
import { AuthServiceImpl } from './service-layer/services/implementations/Auth.Service';
import { CharacterAdminServiceImpl } from './service-layer/services/implementations/Character.Admin.Service';
import { CharacterServiceImpl } from './service-layer/services/implementations/Character.Service';
import { EnvironmentAdminServiceImpl } from './service-layer/services/implementations/Environment.Admin.Service';
import { EnvironmentServiceImpl } from './service-layer/services/implementations/Environment.Service';
import { TravellerServiceImpl } from './service-layer/services/implementations/Traveller.Service';

const serviceSymbols: {[service: string]: symbol} = {
    AuthAdmin: Symbol.for('AuthAdmin'),
    Auth: Symbol.for('Auth'),
    CharacterAdmin: Symbol.for('CharacterAdmin'),
    Character: Symbol.for('Character'),
    EnvironmentAdmin: Symbol.for('EnvironmentAdmin'),
    Environment: Symbol.for('Environment'),
    Traveller: Symbol.for('Traveller')
};

export function Bind(
    container: Container,
    dataLayerBinding: string | symbol,
    contextBinding: string | symbol
): {[service: string]: symbol} {

    container.bind(Symbols.DataLayerFactory).toService(dataLayerBinding);
    container.bind(Symbols.HttpContext).toService(contextBinding);
    container.bind(serviceSymbols.AuthAdmin).to(AuthAdminServiceImpl);
    container.bind(serviceSymbols.Auth).to(AuthServiceImpl);
    container.bind(serviceSymbols.CharacterAdmin).to(CharacterAdminServiceImpl);
    container.bind(serviceSymbols.Character).to(CharacterServiceImpl);
    container.bind(serviceSymbols.EnvironmentAdmin).to(EnvironmentAdminServiceImpl);
    container.bind(serviceSymbols.Environment).to(EnvironmentServiceImpl);
    container.bind(serviceSymbols.Traveller).to(TravellerServiceImpl);
    
    return serviceSymbols;    
}