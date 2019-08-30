import 'reflect-metadata';
import { TestContainer, withDataLayer } from './Utils/Test.Container.spec';
import { CharacterAdminService } from '../src';
import { TYPES } from '../src/service-references/azimuth-types';
import { of } from 'rxjs';

beforeEach(() => {
    TestContainer.snapshot();
});

afterEach(() => {
    TestContainer.restore();
});


test('assignSophontAttribute', (done) => {
    const DataLayer = {
        assignSophontAttribute: jest.fn().mockImplementation((sophontId, attributeId, modifier) => {
            expect(sophontId).toBe(1);
            expect(attributeId).toBe(1);
            expect(modifier).toBe(2);
            return of([]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.assignSophontAttribute(1, 1, 2)
        .subscribe(() => {
            done();
        })
});

test('assignSophontSkill', (done) => {
    const DataLayer = {
        assignSophontSkill: jest.fn().mockImplementation((sophontId, skillId, skillModifier, normallyOn, onConditionId, offConditionId) => {
            expect(sophontId).toBe(1);
            expect(skillId).toBe(1);
            expect(skillModifier).toBe(2);
            expect(normallyOn).toBe('ON');
            expect(onConditionId).toBeUndefined();
            expect(offConditionId).toBe(1);
            return of([]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.assignSophontSkill(1, 1, 2, true, undefined, 1)
        .subscribe(() => {
            done();
        });
});

test('assignSophontSkill 2', (done) => {
    const DataLayer = {
        assignSophontSkill: jest.fn().mockImplementation((sophontId, skillId, skillModifier, normallyOn, onConditionId, offConditionId) => {
            expect(sophontId).toBe(1);
            expect(skillId).toBe(1);
            expect(skillModifier).toBe(-2);
            expect(normallyOn).toBe('OFF');
            expect(onConditionId).toBe(2);
            expect(offConditionId).toBeUndefined();
            return of([]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.assignSophontSkill(1, 1, -2, false, 2, undefined)
        .subscribe(() => {
            done();
        });
});

test('deleteAttribute', (done) => {
    const DataLayer = {
        deleteAttribute: jest.fn().mockImplementation((attributeId) => {
            expect(attributeId).toBe(10);
            return of([]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.deleteAttribute(10)
        .subscribe(() => {
            done()
        });
});

test('deleteSkillGroup', (done) => {
    const DataLayer = {
        deleteSkillGroup: jest.fn().mockImplementation((skillGroupId) => {
            expect(skillGroupId).toBe(10);
            return of([]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.deleteSkillGroup(10)
        .subscribe(() => {
            done()
        });
});

test('deleteSkill', (done) => {
    const DataLayer = {
        deleteSkill: jest.fn().mockImplementation((skillId) => {
            expect(skillId).toBe(10);
            return of([]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.deleteSkill(10)
        .subscribe(() => {
            done()
        });
});

test('insertAttribute', (done) => {
    const DataLayer = {
        upsertAttribute: jest.fn().mockImplementation((attributeId, name, short, description) => {
            expect(attributeId).toBeUndefined();
            expect(name).toBe('Strength');
            expect(short).toBe('STR');
            expect(description).toBe('Strength');
            return of([[{id: 1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertAttribute(undefined, 'Strength', 'STR', 'Strength')
        .subscribe(id => {
            expect(id).toBe(1);
            done();
        })
});

test('updateAttribute', (done) => {
    const DataLayer = {
        upsertAttribute: jest.fn().mockImplementation((attributeId, name, short, description) => {
            expect(attributeId).toBe(1);
            expect(name).toBe('Strength');
            expect(short).toBe('STR');
            expect(description).toBe('Strength');
            return of([[{id: 1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertAttribute(1, 'Strength', 'STR', 'Strength')
        .subscribe(id => {
            expect(id).toBe(1);
            done();
        })
});

test('insertSkillGroup', (done) => {
    const DataLayer = {
        upsertSkillGroup: jest.fn().mockImplementation((id, name, description) => {
            expect(id).toBeUndefined();
            expect(name).toBe('Electronics');
            expect(description).toBe('Electronics Skill');
            return of([[{id: 10}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertSkillGroup(undefined, 'Electronics', 'Electronics Skill')
        .subscribe(id => {
            expect(id).toBe(10);
            done();
        });
});

test('updateSkillGroup', (done) => {
    const DataLayer = {
        upsertSkillGroup: jest.fn().mockImplementation((id, name, description) => {
            expect(id).toBe(10);
            expect(name).toBe('Electronics');
            expect(description).toBe('Electronics Skill');
            return of([[{id: 10}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertSkillGroup(10, 'Electronics', 'Electronics Skill')
        .subscribe(id => {
            expect(id).toBe(10);
            done();
        });
});

test('insertSkill', (done) => {
    const DataLayer = {
        upsertSkill: jest.fn().mockImplementation((id, groupId, name, description) => {
            expect(id).toBeUndefined();
            expect(groupId).toBe(undefined);
            expect(name).toBe('Admin');
            expect(description).toBe('Administration');
            return of([[{id: 1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertSkill(undefined, undefined, 'Admin', 'Administration')
        .subscribe(id => {
            expect(id).toBe(1);
            done();
        })
});

test('insertSkill - 2', (done) => {
    const DataLayer = {
        upsertSkill: jest.fn().mockImplementation((id, groupId, name, description) => {
            expect(id).toBeUndefined();
            expect(groupId).toBe(10);
            expect(name).toBe('Computers');
            expect(description).toBe('Computer Operations');
            return of([[{id: 20}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertSkill(undefined, 10, 'Computers', 'Computer Operations')
        .subscribe(id => {
            expect(id).toBe(20);
            done();
        })
});


test('updateSkill', (done) => {
    const DataLayer = {
        upsertSkill: jest.fn().mockImplementation((id, groupId, name, description) => {
            expect(id).toBe(1);
            expect(groupId).toBe(undefined);
            expect(name).toBe('Admin');
            expect(description).toBe('Administration');
            return of([[{id: 1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertSkill(1, undefined, 'Admin', 'Administration')
        .subscribe(id => {
            expect(id).toBe(1);
            done();
        })
});

test('updateSkill - 2', (done) => {
    const DataLayer = {
        upsertSkill: jest.fn().mockImplementation((id, groupId, name, description) => {
            expect(id).toBe(20);
            expect(groupId).toBe(10);
            expect(name).toBe('Computers');
            expect(description).toBe('Computer Operations');
            return of([[{id: 20}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertSkill(20, 10, 'Computers', 'Computer Operations')
        .subscribe(id => {
            expect(id).toBe(20);
            done();
        })
});


test('insertSophont', (done) => {
    const DataLayer = {
        upsertSophont: jest.fn().mockImplementation((id, name, playable, description) => {
            expect(id).toBeUndefined();
            expect(name).toBe('Human (Imperial)');
            expect(playable).toBe('Y');
            expect(description).toBe('Hoomaaans');
            return of([[{id: 1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertSophont(undefined, 'Human (Imperial)', true, 'Hoomaaans')
        .subscribe(id => {
            expect(id).toBe(1);
            done();
        })
});

test('insertSophont 2', (done) => {
    const DataLayer = {
        upsertSophont: jest.fn().mockImplementation((id, name, playable, description) => {
            expect(id).toBeUndefined();
            expect(name).toBe('Hiver');
            expect(playable).toBe('N');
            expect(description).toBe('Hivers');
            return of([[{id: 2}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertSophont(undefined, 'Hiver', false, 'Hivers')
        .subscribe(id => {
            expect(id).toBe(2);
            done();
        })
});

test('updateSophont', (done) => {
    const DataLayer = {
        upsertSophont: jest.fn().mockImplementation((id, name, playable, description) => {
            expect(id).toBe(1);
            expect(name).toBe('Human (Imperial)');
            expect(playable).toBe('Y');
            expect(description).toBe('Hoomaaans');
            return of([[{id: 1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertSophont(1, 'Human (Imperial)', true, 'Hoomaaans')
        .subscribe(id => {
            expect(id).toBe(1);
            done();
        })
});

test('updateSophont 2', (done) => {
    const DataLayer = {
        upsertSophont: jest.fn().mockImplementation((id, name, playable, description) => {
            expect(id).toBe(2);
            expect(name).toBe('Hiver');
            expect(playable).toBe('N');
            expect(description).toBe('Hivers');
            return of([[{id: 2}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterAdminService>(TYPES.CharacterAdminService);
    service.upsertSophont(2, 'Hiver', false, 'Hivers')
        .subscribe(id => {
            expect(id).toBe(2);
            done();
        })
});