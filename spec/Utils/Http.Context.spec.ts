import 'reflect-metadata';

export const HttpContext = {
    Request: {},
    Response: {},
    Next: () => {},
    CurrentUser: {
        id: 1234,
        username: 'testUser',
        roles: [
            {
                id: 1,
                name: 'SiteUser'
            }
        ]
    }
}

test('HttpContext', () => {});