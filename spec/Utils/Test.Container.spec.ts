import 'reflect-metadata';
import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from '../../src/service-references/azimuth-types';
import { HttpContext } from './Http.Context.spec';
import { HttpExceptionNames, HttpExceptionCodes, HttpExceptions, Exception } from '../../src/service-references/azimuth-exceptions';
import { ServiceLayerModule } from '../../src';

export const TestContainer: Container = (container => {
    container.bind(TYPES.HttpContext).toConstantValue(HttpContext);
    container.bind<interfaces.Newable<Exception>>(HttpExceptions.NotFoundException).toConstructor(NotFoundException);
    container.bind<interfaces.Newable<Exception>>(HttpExceptions.InternalServerException).toConstructor(InternalServerException);
    container.load(ServiceLayerModule);
    return container;
})(new Container());

export function withDataLayer(dataLayer: any): ContainerModule {
    return new ContainerModule(bind => {
        bind(TYPES.DataLayerFactory).toFunction(() => dataLayer);
    });
}
class NotFoundException extends Error {
    public status: number = HttpExceptionCodes.NotFoundException;

    constructor(message?: string, public details?: any) {
        super(message);
        this.name = HttpExceptionNames.NotFoundException;
        
    }
}

class InternalServerException extends Error {
    public status: number = HttpExceptionCodes.InternalServerException;

    constructor(message?: string, public details?: any) {
        super(message);
        this.name = HttpExceptionNames.InternalServerException;
        
    }
}