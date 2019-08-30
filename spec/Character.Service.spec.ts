import 'reflect-metadata';
import { TestContainer, withDataLayer } from './Utils/Test.Container.spec';
import { CharacterService } from '../src';
import { TYPES } from '../src/service-references/azimuth-types';
import { of } from 'rxjs';

beforeEach(() => {
    TestContainer.snapshot();
});

afterEach(() => {
    TestContainer.restore();
});

test('findAttribute', (done) => {
    const DataLayer = {
        findAttribute: jest.fn().mockImplementation((short) => {
            expect(short).toBe('STR');
            return of([[{attribute_id:1, attribute_name: 'Strength', attribute_short: 'STR', description_id: 1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterService>(TYPES.CharacterService);
    service.findAttribute('STR')
        .subscribe(str => {
            expect(str.id).toBe(1);
            expect(str.name).toBe('Strength');
            expect(str.short).toBe('STR');
            expect(str.descriptionId).toBe(1);
            done();
        });
});

test('getAttributes', (done) => {
    const DataLayer = {
        getAttributes: jest.fn().mockImplementation(() => {
            return of([[
                {attribute_id:1, attribute_name: 'Strength', attribute_short: 'STR', description_id: 1},
                {attribute_id:2, attribute_name: 'Dexterity', attribute_short: 'DEX', description_id: 2},
                {attribute_id:3, attribute_name: 'Endurance', attribute_short: 'END', description_id: 3}
            ]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterService>(TYPES.CharacterService);
    service.getAttributes()
        .subscribe(attrs => {
            expect(attrs).toHaveLength(3);
            const str = attrs[0];
            const dex = attrs[1];
            const end = attrs[2];
            expect(str.id).toBe(1);
            expect(str.name).toBe('Strength');
            expect(str.short).toBe('STR');
            expect(str.descriptionId).toBe(1);
            
            expect(dex.id).toBe(2);
            expect(dex.name).toBe('Dexterity');
            expect(dex.short).toBe('DEX');
            expect(dex.descriptionId).toBe(2);
            
            expect(end.id).toBe(3);
            expect(end.name).toBe('Endurance');
            expect(end.short).toBe('END');
            expect(end.descriptionId).toBe(3);
            done();
        })
});

test('getAttribute', (done) => {
    const DataLayer = {
        getAttribute: jest.fn().mockImplementation((attributeId) => {
            expect(attributeId).toBe(1);
            return of([[{attribute_id:1, attribute_name: 'Strength', attribute_short: 'STR', description_id: 1}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterService>(TYPES.CharacterService);
    service.getAttribute(1)
        .subscribe(str => {
            expect(str.id).toBe(1);
            expect(str.name).toBe('Strength');
            expect(str.short).toBe('STR');
            expect(str.descriptionId).toBe(1);
            done();
        });
});

test('getSkill', (done) => {
    const DataLayer = {
        getSkill: jest.fn().mockImplementation((skillId) => {
            expect(skillId).toBe(1);
            return of([[
                {
                    skill_id: 1,
                    skill_group_id: undefined,
                    skill_description_id: 127,
                    skill_group_description_id: undefined,
                    skill_full_name: 'Admin',
                    skill_group_name: undefined,
                    skill_name: 'Admin'
                }
            ]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterService>(TYPES.CharacterService);
    service.getSkill(1)
        .subscribe(skill => {
            expect(skill.id).toBe(1);
            expect(skill.groupId).toBeUndefined();
            expect(skill.groupDescriptionId).toBeUndefined();
            expect(skill.descriptionId).toBe(127);
            expect(skill.fullName).toBe('Admin');
            expect(skill.groupName).toBe(undefined);
            expect(skill.name).toBe('Admin');
            done();
        });
});

test('getSkill 2', (done) => {
    const DataLayer = {
        getSkill: jest.fn().mockImplementation((skillId) => {
            expect(skillId).toBe(10);
            return of([[
                {
                    skill_id: 10,
                    skill_group_id: 3,
                    skill_description_id: 244,
                    skill_group_description_id: 42,
                    skill_full_name: 'Electronics (Computers)',
                    skill_group_name: 'Electronics',
                    skill_name: 'Computers'
                }
            ]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterService>(TYPES.CharacterService);
    service.getSkill(10)
        .subscribe(skill => {
            expect(skill.id).toBe(10);
            expect(skill.groupId).toBe(3);
            expect(skill.groupDescriptionId).toBe(42);
            expect(skill.descriptionId).toBe(244);
            expect(skill.fullName).toBe('Electronics (Computers)');
            expect(skill.groupName).toBe('Electronics');
            expect(skill.name).toBe('Computers');
            done();
        });
});

test('getSkills', (done) => {
    const DataLayer = {
        getSkills: jest.fn().mockImplementation(() => {
            return of([[
                {
                    skill_id: 1,
                    skill_group_id: undefined,
                    skill_description_id: 127,
                    skill_group_description_id: undefined,
                    skill_full_name: 'Admin',
                    skill_group_name: undefined,
                    skill_name: 'Admin'
                },
                {
                    skill_id: 10,
                    skill_group_id: 3,
                    skill_description_id: 244,
                    skill_group_description_id: 42,
                    skill_full_name: 'Electronics (Computers)',
                    skill_group_name: 'Electronics',
                    skill_name: 'Computers'
                }
            ]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterService>(TYPES.CharacterService);
    service.getSkills()
        .subscribe(skills => {
            expect(skills).toHaveLength(2);
            expect(skills[0].id).toBe(1);
            expect(skills[0].groupId).toBeUndefined();
            expect(skills[0].groupDescriptionId).toBeUndefined();
            expect(skills[0].descriptionId).toBe(127);
            expect(skills[0].fullName).toBe('Admin');
            expect(skills[0].groupName).toBe(undefined);
            expect(skills[0].name).toBe('Admin');

            expect(skills[1].id).toBe(10);
            expect(skills[1].groupId).toBe(3);
            expect(skills[1].groupDescriptionId).toBe(42);
            expect(skills[1].descriptionId).toBe(244);
            expect(skills[1].fullName).toBe('Electronics (Computers)');
            expect(skills[1].groupName).toBe('Electronics');
            expect(skills[1].name).toBe('Computers');
            done();
        })
});

test('getSkillGroups', (done) => {
    const DataLayer = {
        getSkillGroups: jest.fn().mockImplementation(() => {
            return of([[
                {skill_group_id: 1, skill_group_name: 'Electronics', description_id: 12},
                {skill_group_id: 2, skill_group_name: 'Pilot', description_id: 13}
            ]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterService>(TYPES.CharacterService);
    service.getSkillGroups()
        .subscribe(groups => {
            expect(groups).toHaveLength(2);
            expect(groups[0].id).toBe(1);
            expect(groups[0].name).toBe('Electronics');
            expect(groups[0].descriptionId).toBe(12);
            expect(groups[1].id).toBe(2);
            expect(groups[1].name).toBe('Pilot');
            expect(groups[1].descriptionId).toBe(13);
            done();
        })
});

test('getSkillGroup', (done) => {
    const DataLayer = {
        getSkillGroup: jest.fn().mockImplementation((id) => {
            expect(id).toBe(1);
            return of([[{skill_group_id: 1, skill_group_name: 'Electronics', description_id: 12}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterService>(TYPES.CharacterService);
    service.getSkillGroup(1)
        .subscribe(group => {
            expect(group.id).toBe(1);
            expect(group.name).toBe('Electronics');
            expect(group.descriptionId).toBe(12);
            done();
        })
});

test('getSophont', (done) => {
    const DataLayer = {
        getSophont: jest.fn().mockImplementation((id) => {
            return of([
                [{sophont_id: 1, sophont_name: 'Human', sophont_playable_flag: 'Y', description_id: 1}],
                [{
                    sophont_id: 1,
                    attribute_id: 1,
                    attribute_modifier: 1
                }],
                [{
                    sophont_id: 1,
                    skill_id: 1,
                    skill_modifier: 2,
                    on_condition_id: undefined,
                    off_condition_id: undefined,
                    normally_on_off: 'ON'
                }]
            ])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterService>(TYPES.CharacterService);
    service.getSophont(1)
        .subscribe(human => {
            expect(human.id).toBe(1);
            expect(human.name).toBe('Human');
            expect(human.playable).toBe(true);
            expect(human.descriptionId).toBe(1);
            expect(human.attributes).toHaveLength(1);
            expect(human.skills).toHaveLength(1);
            done();
        })
});

test('getSophonts', (done) => {
    const DataLayer = {
        getSophonts: jest.fn().mockImplementation(() => {
            return of([[
                {sophont_id: 1, sophont_name: 'Human', sophont_playable_flag: 'Y', description_id: 1},
                {sophont_id: 2, sophont_name: 'Hiver', sophont_playable_flag: 'N', description_id: 2}
            ]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<CharacterService>(TYPES.CharacterService);
    service.getSophonts()
        .subscribe(sophonts => {
            expect(sophonts).toHaveLength(2);
            const human = sophonts[0];
            const hiver = sophonts[1];
            expect(human.id).toBe(1);
            expect(human.name).toBe('Human');
            expect(human.playable).toBe(true);
            expect(human.descriptionId).toBe(1);
            expect(hiver.id).toBe(2);
            expect(hiver.name).toBe('Hiver');
            expect(hiver.playable).toBe(false);
            expect(hiver.descriptionId).toBe(2);
            done();
        })
});