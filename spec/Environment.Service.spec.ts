import 'reflect-metadata';
import { TestContainer, withDataLayer } from './Utils/Test.Container.spec';
import { EnvironmentService } from '../src';
import { TYPES } from '../src/service-references/azimuth-types';
import { of } from 'rxjs';

beforeEach(() => {
    TestContainer.snapshot();
});

afterEach(() => {
    TestContainer.restore();
});

test('getConditions', (done) => {
    const DataLayer = {
        getConditions: jest.fn().mockImplementation(() => {
            return of([[
                {condition_id:1, condition_name:'Darkness', description_id: 1},
                {condition_id:2, condition_name:'Hazy', description_id: 2}
            ]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<EnvironmentService>(TYPES.EnvironmentService);
    service.getConditions()
        .subscribe(conditions => {
            expect(conditions).toHaveLength(2);
            const darkness = conditions[0];
            const hazy = conditions[1];
            expect(darkness.id).toBe(1);
            expect(darkness.name).toBe('Darkness');
            expect(darkness.descriptionId).toBe(1);
            expect(hazy.id).toBe(2);
            expect(hazy.name).toBe('Hazy');
            expect(hazy.descriptionId).toBe(2);
            done();
        })
});

test('getCondition', (done) => {
    const DataLayer = {
        getCondition: jest.fn().mockImplementation((id) => {
            expect(id).toBe(1);
            return of([[{condition_id:1, condition_name:'Darkness', description_id: 1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<EnvironmentService>(TYPES.EnvironmentService);
    service.getCondition(1)
        .subscribe(darkness => {
            expect(darkness.id).toBe(1);
            expect(darkness.name).toBe('Darkness');
            expect(darkness.descriptionId).toBe(1);
            done();
        })
});