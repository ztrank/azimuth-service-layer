import 'reflect-metadata';
import { TestContainer, withDataLayer } from './Utils/Test.Container.spec';
import { DescriptionService } from '../src';
import { TYPES } from '../src/service-references/azimuth-types';
import { of } from 'rxjs';

beforeEach(() => {
    TestContainer.snapshot();
});

afterEach(() => {
    TestContainer.restore();
});

test('getDescription', (done) => {
    const DataLayer = {
        getDescription: jest.fn().mockImplementation((id) => {
            expect(id).toBe(1);
            return of([[{description_id: 1, description_value: 'Some description'}]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<DescriptionService>(TYPES.MediaService);
    service.getDescription(1)
        .subscribe(description => {
            expect(description.id).toBe(1);
            expect(description.value).toBe('Some description');
            done();
        });
});