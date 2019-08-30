import { Observable } from 'rxjs';

export interface Procedures {
    assignRole(roleId: number, userId: number): Observable<Responses.Void>;
    deleteRole(roleId: number): Observable<Responses.Void>;
    findUserAndRoles(providerName: string, providerUserId: string): Observable<Responses.FindUserAndRoles>;
    findUser(providerName: string, providerUserId: string): Observable<Responses.FindUser>;
    getProviders(): Observable<Responses.GetProviders>;
    getProvider(providerId: number): Observable<Responses.GetProviders>;
    getRoles(): Observable<Responses.GetRoles>;
    getRole(roleId: number): Observable<Responses.GetRoles>;
    getUserRoles(userId: number): Observable<Responses.GetRoles>;
    getUsers(): Observable<Responses.GetUsers>;
    getUser(userId: number): Observable<Responses.GetUsers>;
    insProvider(providerName: string): Observable<Responses.InsertProvider>;
    registerUser(providerName: string, providerUserId: string, username: string): Observable<Responses.RegisterUser>;
    revokeRole(roleId: number, userId: number): Observable<Responses.Void>;
    testUsername(username: string): Observable<Responses.TestUsername>;
    upsertRole(id: number | undefined, name: string, defaultRole: 'Y' | 'N', description: string): Observable<Responses.UpsertRole>;
}

export namespace Responses {
    export type Void = [];
    export type FindUserAndRoles = [Types.User[], Types.Role[]];
    export type FindUser = [Types.User[]];
    export type GetProviders = [Types.Provider[]];
    export type GetRoles = [Types.Role[]];
    export type GetUsers = [Types.User[]];
    export type InsertProvider = [Types.ProviderId[]];
    export type RegisterUser = [Types.UserId[]];
    export type TestUsername = [Types.TestUsername[]];
    export type UpsertRole = [Types.RoleId[]];
}

export namespace Types {
    export interface Role {
        role_id: number;
        role_name: string;
        description_id?: number;
    }

    export interface User {
        user_id: number;
        user_name: string;
        active_flag: 'Y' | 'N';
    }

    export interface Provider {
        provider_id: number;
        provider_name: string;
    }

    export interface TestUsername {
        available: 'Y' | 'N';
    }

    export interface RoleId {
        role_id: number;
    }

    export interface UserId {
        user_id: number;
    }

    export interface ProviderId {
        provider_id: number;
    }
}