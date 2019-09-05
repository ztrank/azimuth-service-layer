import 'reflect-metadata';
import { TestContainer, withDataLayer } from './Utils/Test.Container.spec';
import { TravellerService, TravellerSkill } from '../src';
import { TYPES } from '../src/service-references/azimuth-types';
import { of } from 'rxjs';
import { HttpContext } from './Utils/Http.Context.spec';
import { TravellerAttribute } from '../src/service-layer/responses/implementations/player/Traveller.Attribute';

beforeEach(() => {
    TestContainer.snapshot();
});

afterEach(() => {
    TestContainer.restore();
});


test('getMyTravellers', (done) => {
    const DataLayer = {
        getMyTravellers: jest.fn().mockImplementation((executingUserId) => {
            expect(executingUserId).toBe(HttpContext.CurrentUser.id);
            return of([[
                {
                    traveller_id: 1,
                    user_id: HttpContext.CurrentUser.id,
                    sophont_id: 1,
                    traveller_first_name: 'Clara',
                    traveller_last_name: 'Grahn',
                    traveller_nick_name: 'Clara'
                },
                {
                    traveller_id: 2,
                    user_id: HttpContext.CurrentUser.id,
                    sophont_id: 1,
                    traveller_first_name: 'Raja',
                    traveller_last_name: 'Ajam',
                    traveller_nick_name: 'Raj'
                }
            ], [], []])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<TravellerService>(TYPES.TravellerService);
    service.getMyTravellers()
        .subscribe(travellers => {
            expect(travellers).toHaveLength(2);
            const clara = travellers[0];
            const raja = travellers[1];
            expect(clara.id).toBe(1);
            expect(clara.userId).toBe(HttpContext.CurrentUser.id);
            expect(clara.sophontId).toBe(1);
            expect(clara.name.first).toBe('Clara');
            expect(clara.name.last).toBe('Grahn');
            expect(clara.name.nickname).toBe('Clara');
            
            expect(raja.id).toBe(2);
            expect(raja.userId).toBe(HttpContext.CurrentUser.id);
            expect(raja.sophontId).toBe(1);
            expect(raja.name.first).toBe('Raja');
            expect(raja.name.last).toBe('Ajam');
            expect(raja.name.nickname).toBe('Raj');
            
            done();
        })
});

test('getTraveller', (done) => {
    const DataLayer = {
        getTraveller: jest.fn().mockImplementation((executingUserId, id) => {
            expect(executingUserId).toBe(HttpContext.CurrentUser.id);
            expect(id).toBe(2);
            return of([
                [{
                    traveller_id: 2,
                    user_id: HttpContext.CurrentUser.id,
                    sophont_id: 1,
                    traveller_first_name: 'Raja',
                    traveller_last_name: 'Ajam',
                    traveller_nick_name: 'Raj'
                }],
                [
                    {
                        traveller_id:2,
                        skill_id: 1,
                        ranks: 1
                    },
                    {
                        traveller_id:2,
                        skill_id: 2,
                        ranks: 2
                    }
                ],
                [
                    {
                        traveller_id:2,
                        attribute_id:1,
                        attribute_value:10,
                        attribute_base_value:10
                    },
                    {
                        traveller_id:2,
                        attribute_id:2,
                        attribute_value:11,
                        attribute_base_value:11
                    }
                ]
            ])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<TravellerService>(TYPES.TravellerService);
    service.getTraveller(2)
        .subscribe(raja => {
            expect(raja.id).toBe(2);
            expect(raja.userId).toBe(HttpContext.CurrentUser.id);
            expect(raja.sophontId).toBe(1);
            expect(raja.name.first).toBe('Raja');
            expect(raja.name.last).toBe('Ajam');
            expect(raja.name.nickname).toBe('Raj');
            expect(raja.skills).toHaveLength(2);
            expect(raja.attributes).toHaveLength(2);
            const skills = <TravellerSkill[]>raja.skills;
            const attributes = <TravellerAttribute[]>raja.attributes;
            expect(skills[0].travellerId).toBe(2);
            expect(skills[0].skillId).toBe(1);
            expect(skills[0].ranks).toBe(1);
            expect(skills[1].travellerId).toBe(2);
            expect(skills[1].skillId).toBe(2);
            expect(skills[1].ranks).toBe(2);

            expect(attributes[0].travellerId).toBe(2);
            expect(attributes[0].attributeId).toBe(1);
            expect(attributes[0].base).toBe(10);
            expect(attributes[0].value).toBe(10);
            expect(attributes[1].travellerId).toBe(2);
            expect(attributes[1].attributeId).toBe(2);
            expect(attributes[1].base).toBe(11);
            expect(attributes[1].value).toBe(11);
            done();
        })
});

test('upsertTravellerAttribute', (done) => {
    const DataLayer = {
        upsertTravellerAttribute: jest.fn().mockImplementation((executingUserId, travellerId, attributeId, baseValue, value) => {
            expect(executingUserId).toBe(HttpContext.CurrentUser.id);
            expect(travellerId).toBe(2);
            expect(attributeId).toBe(1);
            expect(baseValue).toBe(10);
            expect(value).toBe(10);
            return of([]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<TravellerService>(TYPES.TravellerService);
    service.upsertTravellerAttribute(2, 1, 10, 10)
        .subscribe(() => done());
});

test('upsertTravellerSkill', (done) => {
    const DataLayer = {
        upsertTravellerSkill: jest.fn().mockImplementation((executingUserId, travellerId, skillId, ranks) => {
            expect(executingUserId).toBe(HttpContext.CurrentUser.id);
            expect(travellerId).toBe(2);
            expect(skillId).toBe(2);
            expect(ranks).toBe(4);
            return of([]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<TravellerService>(TYPES.TravellerService);
    service.upsertTravellerSkill(2, 2, 4)
        .subscribe(() => done());
});

test('insertTraveller', (done) => {
    const DataLayer = {
        upsertTraveller: jest.fn().mockImplementation((executingUserId, travellerId, userId, sophontId, firstName, lastName, nickName) => {
            expect(executingUserId).toBe(HttpContext.CurrentUser.id);
            expect(travellerId).toBe(undefined);
            expect(userId).toBe(HttpContext.CurrentUser.id);
            expect(sophontId).toBe(1);
            expect(firstName).toBe('Alex');
            expect(lastName).toBe('Radinga');
            expect(nickName).toBe('Alex');
            return of([[{id:3}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<TravellerService>(TYPES.TravellerService);
    service.upsertTraveller(undefined, 1, 'Alex', 'Radinga', 'Alex')
        .subscribe(id => {
            expect(id).toBe(3);
            done();
        });
});

test('updateTraveller', (done) => {
    const DataLayer = {
        upsertTraveller: jest.fn().mockImplementation((executingUserId, travellerId, userId, sophontId, firstName, lastName, nickName) => {
            expect(executingUserId).toBe(HttpContext.CurrentUser.id);
            expect(travellerId).toBe(3);
            expect(userId).toBe(HttpContext.CurrentUser.id);
            expect(sophontId).toBe(1);
            expect(firstName).toBe('Alex');
            expect(lastName).toBe('Radinga');
            expect(nickName).toBe('Alex');
            return of([[{id:3}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<TravellerService>(TYPES.TravellerService);
    service.upsertTraveller(3, 1, 'Alex', 'Radinga', 'Alex')
        .subscribe(id => {
            expect(id).toBe(3);
            done();
        });
});