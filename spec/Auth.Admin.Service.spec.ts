import 'reflect-metadata';
import { TestContainer, withDataLayer } from './Utils/Test.Container.spec';
import { AuthAdminService } from '../src';
import { TYPES } from '../src/service-references/azimuth-types';
import { of } from 'rxjs';

beforeEach(() => {
    TestContainer.snapshot();
});

afterEach(() => {
    TestContainer.restore();
});

test('Assign Role', (done) => {
    const DataLayer = {
        assignRole: jest.fn().mockImplementation((roleId, userId) => {
            expect(roleId).toBe(1);
            expect(userId).toBe(2);
            return of(undefined);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.assignRole(1, 2)
        .subscribe(() => {
            expect(DataLayer.assignRole).toHaveBeenCalled();
            done();
        });
});

test('Delete Role', (done) => {
    const DataLayer = {
        deleteRole: jest.fn().mockImplementation((roleId) => {
            expect(roleId).toBe(1);
            return of(undefined);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.deleteRole(1)
        .subscribe(() => {
            expect(DataLayer.deleteRole).toHaveBeenCalled();
            done();
        });
});

test('Get Providers', (done) => {
    const DataLayer = {
        getProviders: jest.fn().mockImplementation(() => {
            return of([[{provider_id: 1, provider_name: 'facebook'}]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.getProviders()
        .subscribe(providers => {
            expect(providers).toHaveLength(1);
            expect(providers[0].id).toBe(1);
            expect(providers[0].name).toBe('facebook');
            done();
        })
});

test('Get Provider', (done) => {
    const DataLayer = {
        getProvider: jest.fn().mockImplementation((providerId) => {
            expect(providerId).toBe(1);
            return of([[{provider_id: 1, provider_name: 'facebook'}]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.getProvider(1)
        .subscribe(provider => {
            expect(provider.id).toBe(1);
            expect(provider.name).toBe('facebook');
            done();
        })
});

test('Get Roles', (done) => {
    const DataLayer = {
        getRoles: jest.fn().mockImplementation(() => {
            return of([[{role_id: 1, role_name: 'SiteUser', description_id: 1},{role_id: 2, role_name: 'Admin', description_id: 2}]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.getRoles()
        .subscribe(roles => {
            expect(roles).toHaveLength(2);
            expect(roles[0].id).toBe(1);
            expect(roles[0].name).toBe('SiteUser');
            expect(roles[0].descriptionId).toBe(1);
            expect(roles[1].id).toBe(2);
            expect(roles[1].name).toBe('Admin');
            expect(roles[1].descriptionId).toBe(2);
            done();
        })
});

test('Get Role', (done) => {
    const DataLayer = {
        getRole: jest.fn().mockImplementation((roleId) => {
            expect(roleId).toBe(1);
            return of([[{role_id: 1, role_name: 'SiteUser', description_id: 1}]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.getRole(1)
        .subscribe(role => {
            expect(role.id).toBe(1);
            expect(role.name).toBe('SiteUser');
            expect(role.descriptionId).toBe(1);
            done();
        })
});

test('Get Role Users', (done) => {
    const DataLayer = {
        getRoleUsers: jest.fn().mockImplementation((roleId) => {
            expect(roleId).toBe(1);
            return of([[{user_id:1, user_name: 'testUser', active_flag: 'Y'},{user_id:2, user_name: 'testUser2', active_flag: 'Y'},{user_id:3, user_name: 'testUser3', active_flag: 'N'}]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.getRoleUsers(1)
        .subscribe(users => {
            expect(users).toHaveLength(3);
            expect(users[0].id).toBe(1);
            expect(users[0].active).toBe(true);
            expect(users[0].username).toBe('testUser');
            expect(users[1].id).toBe(2);
            expect(users[1].active).toBe(true);
            expect(users[1].username).toBe('testUser2');
            expect(users[2].id).toBe(3);
            expect(users[2].active).toBe(false);
            expect(users[2].username).toBe('testUser3');
            done();
        })
});

test('Get User Roles', (done) => {
    const DataLayer = {
        getUserRoles: jest.fn().mockImplementation((userId) => {
            expect(userId).toBe(1);
            return of([[{role_id:1, role_name: 'SiteUser', description_id: 1}]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.getUserRoles(1)
        .subscribe(roles => {
            expect(roles[0].id).toBe(1);
            expect(roles[0].name).toBe('SiteUser');
            expect(roles[0].descriptionId).toBe(1);
            done();
        })
});


test('Get Users', (done) => {
    const DataLayer = {
        getUsers: jest.fn().mockImplementation(() => {
            return of([[{user_id:1, user_name: 'testUser', active_flag: 'Y'},{user_id:2, user_name: 'testUser2', active_flag: 'Y'},{user_id:3, user_name: 'testUser3', active_flag: 'N'}]])
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.getUsers()
        .subscribe(users => {
            expect(users).toHaveLength(3);
            expect(users[0].id).toBe(1);
            expect(users[0].active).toBe(true);
            expect(users[0].username).toBe('testUser');
            expect(users[1].id).toBe(2);
            expect(users[1].active).toBe(true);
            expect(users[1].username).toBe('testUser2');
            expect(users[2].id).toBe(3);
            expect(users[2].active).toBe(false);
            expect(users[2].username).toBe('testUser3');
            done();
        })
});

test('Ins Provider', (done) => {
    const DataLayer = {
        insProvider: jest.fn().mockImplementation((providerName) => {
            expect(providerName).toBe('google-oauth2');
            return of([[{provider_id:2}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.insProvider('google-oauth2')
        .subscribe(id => {
            expect(id).toBe(2);
            done();
        })
});

test('Revoke Role', (done) => {
    const DataLayer = {
        revokeRole: jest.fn().mockImplementation((roleId, userId) => {
            expect(roleId).toBe(1);
            expect(userId).toBe(2);
            return of(undefined);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.revokeRole(1, 2)
        .subscribe(() => {
            done();
        })
});

test('Insert Role', (done) => {
    const DataLayer = {
        upsertRole: jest.fn().mockImplementation((id, name, defaultRole, description) => {
            expect(id).toBeUndefined();
            expect(name).toBe('ContentEditor');
            expect(defaultRole).toBe('N');
            expect(description).toBe('description');
            return of([[{role_id:5}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.upsertRole(undefined, 'ContentEditor', false, 'description')
        .subscribe(id => {
            expect(id).toBe(5);
            done();
        });
});

test('Update Role', (done) => {
    const DataLayer = {
        upsertRole: jest.fn().mockImplementation((id, name, defaultRole, description) => {
            expect(id).toBe(5);
            expect(name).toBe('ContentEditor');
            expect(defaultRole).toBe('Y');
            expect(description).toBe('description2');
            return of([[{role_id:5}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthAdminService>(TYPES.AuthAdminService);
    service.upsertRole(5, 'ContentEditor', true, 'description2')
        .subscribe(id => {
            expect(id).toBe(5);
            done();
        });
});
