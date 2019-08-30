import 'reflect-metadata';
import { TestContainer, withDataLayer } from './Utils/Test.Container.spec';
import { AuthService } from '../src';
import { TYPES } from '../src/service-references/azimuth-types';
import { of } from 'rxjs';
import { Role } from '../src/service-layer/responses/implementations/auth/Role';

beforeEach(() => {
    TestContainer.snapshot();
});

afterEach(() => {
    TestContainer.restore();
});

test('FindUserAndRoles', (done) => {
    const DataLayer = {
        findUserAndRoles: jest.fn().mockImplementation((providerName, providerUserId) => {
            expect(providerName).toBe('facebook');
            expect(providerUserId).toBe('123456789');
            return of([[{user_id:1,user_name:'testUser',active_flag:'Y'}],[{role_id:1, role_name:'SiteUser'}, {role_id:2, role_name:'ContentEditor'}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthService>(TYPES.AuthService);
    service.findUserAndRoles('facebook', '123456789')
        .subscribe(user => {
            expect(user).toBeDefined();
            expect(user.id).toBe(1);
            expect(user.username).toBe('testUser');
            expect(user.active).toBe(true);
            expect(user.roles).toBeDefined();
            expect(user.roles).toHaveLength(2);
            const roles = <Role[]>user.roles;
            expect(roles[0].id).toBe(1);
            expect(roles[0].name).toBe('SiteUser');
            expect(roles[1].id).toBe(2);
            expect(roles[1].name).toBe('ContentEditor');
            done();
        })
});

test('FindUser', (done) => {
    const DataLayer = {
        findUser: jest.fn().mockImplementation((providerName, providerUserId) => {
            expect(providerName).toBe('facebook');
            expect(providerUserId).toBe('123456789');
            return of([[{user_id:1,user_name:'testUser',active_flag:'Y'}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthService>(TYPES.AuthService);
    service.findUser('facebook', '123456789')
        .subscribe(user => {
            expect(user).toBeDefined();
            expect(user.id).toBe(1);
            expect(user.username).toBe('testUser');
            expect(user.active).toBe(true);
            expect(user.roles).toHaveLength(0);
            done();
        });
});

test('registerUser', (done) => {
    const DataLayer = {
        registerUser: jest.fn().mockImplementation((providerName, providerUserId, username) => {
            expect(providerName).toBe('facebook');
            expect(providerUserId).toBe('987654321');
            expect(username).toBe('registerUser');
            return of([[{user_id:12}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthService>(TYPES.AuthService);
    service.registerUser('facebook', '987654321', 'registerUser')
        .subscribe(id => {
            expect(id).toBe(12);
            done();
        })
});

test('testUsername', (done) => {
    const DataLayer = {
        testUsername: jest.fn().mockImplementation((username) => {
            expect(username).toBe('testUsername');
            return of([[{available: 'N'}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthService>(TYPES.AuthService);
    service.testUsername('testUsername')
        .subscribe(res => {
            expect(res).toBe(false);
            done();
        })
});

test('testUsername - true', (done) => {
    const DataLayer = {
        testUsername: jest.fn().mockImplementation((username) => {
            expect(username).toBe('testUsername');
            return of([[{available: 'Y'}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthService>(TYPES.AuthService);
    service.testUsername('testUsername')
        .subscribe(res => {
            expect(res).toBe(true);
            done();
        })
});

test('getUser', (done) => {
    const DataLayer = {
        getUser: jest.fn().mockImplementation((userId) => {
            expect(userId).toBe(1);
            return of([[{user_id:1,user_name:'testUser',active_flag:'Y'}],[{role_id:1, role_name:'SiteUser'}, {role_id:2, role_name:'ContentEditor'}]]);
        })
    };
    TestContainer.load(withDataLayer(DataLayer));

    const service = TestContainer.get<AuthService>(TYPES.AuthService);
    service.getUser(1)
        .subscribe(user => {
            expect(user).toBeDefined();
            expect(user.id).toBe(1);
            expect(user.username).toBe('testUser');
            expect(user.active).toBe(true);
            expect(user.roles).toBeDefined();
            expect(user.roles).toHaveLength(2);
            const roles = <Role[]>user.roles;
            expect(roles[0].id).toBe(1);
            expect(roles[0].name).toBe('SiteUser');
            expect(roles[1].id).toBe(2);
            expect(roles[1].name).toBe('ContentEditor');
            done();
        })
});