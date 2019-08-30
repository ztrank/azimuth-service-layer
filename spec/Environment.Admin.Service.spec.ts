import 'reflect-metadata';
import { TestContainer, withDataLayer } from './Utils/Test.Container.spec';
import { EnvironmentAdminService } from '../src';
import { TYPES } from '../src/service-references/azimuth-types';
import { of } from 'rxjs';

beforeEach(() => {
    TestContainer.snapshot();
});

afterEach(() => {
    TestContainer.restore();
});

test('deleteCondition', (done) => {
    const DataLayer = {
        deleteCondition: jest.fn().mockImplementation((id) => {
            expect(id).toBe(1);
            return of([]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<EnvironmentAdminService>(TYPES.EnvironmentAdminService);
    service.deleteCondition(1)
        .subscribe(() => done());
});

test('insertCondition', (done) => {
    const DataLayer = {
        upsertCondition: jest.fn().mockImplementation((id, name, description) => {
            expect(id).toBeUndefined();
            expect(name).toBe('Darkness');
            expect(description).toBe('Darkness');
            return of([[{id:1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<EnvironmentAdminService>(TYPES.EnvironmentAdminService);
    service.upsertCondition(undefined, 'Darkness', 'Darkness')
        .subscribe(id => {
            expect(id).toBe(1);
            done();
        })
});

test('updateCondition', (done) => {
    const DataLayer = {
        upsertCondition: jest.fn().mockImplementation((id, name, description) => {
            expect(id).toBe(1);
            expect(name).toBe('Darkness');
            expect(description).toBe('Darkness');
            return of([[{id:1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<EnvironmentAdminService>(TYPES.EnvironmentAdminService);
    service.upsertCondition(1, 'Darkness', 'Darkness')
        .subscribe(id => {
            expect(id).toBe(1);
            done();
        })
});