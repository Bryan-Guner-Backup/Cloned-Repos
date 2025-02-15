import { ReactNode, ReactElement, ComponentType } from 'react';
import { RouteProps, RouteComponentProps, match as Match } from 'react-router-dom';
import { ThemeOptions } from '@material-ui/core';
import { StaticContext } from 'react-router';
import { Location, History, LocationState } from 'history';
import { WithPermissionsChildrenParams } from './auth/WithPermissions';
import { AuthActionType } from './auth/types';
/**
 * data types
 */
export declare type Identifier = string | number;
export interface Record {
    id: Identifier;
    [key: string]: any;
}
export interface RecordMap<RecordType = Record> {
    [id: string]: RecordType;
    [id: number]: RecordType;
}
export interface SortPayload {
    field: string;
    order: string;
}
export interface FilterPayload {
    [k: string]: any;
}
export interface PaginationPayload {
    page: number;
    perPage: number;
}
export declare type ValidUntil = Date;
/**
 * i18nProvider types
 */
export declare const I18N_TRANSLATE = "I18N_TRANSLATE";
export declare const I18N_CHANGE_LOCALE = "I18N_CHANGE_LOCALE";
export declare type Translate = (key: string, options?: any) => string;
export declare type I18nProvider = {
    translate: Translate;
    changeLocale: (locale: string, options?: any) => Promise<void>;
    getLocale: () => string;
    [key: string]: any;
};
export interface UserIdentity {
    id: Identifier;
    fullName?: string;
    avatar?: string;
    [key: string]: any;
}
/**
 * authProvider types
 */
export declare type AuthProvider = {
    login: (params: any) => Promise<any>;
    logout: (params: any) => Promise<void | false | string>;
    checkAuth: (params: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params: any) => Promise<any>;
    getIdentity?: () => Promise<UserIdentity>;
    [key: string]: any;
};
export declare type LegacyAuthProvider = (type: AuthActionType, params?: any) => Promise<any>;
/**
 * dataProvider types
 */
export declare type DataProvider = {
    getList: <RecordType extends Record = Record>(resource: string, params: GetListParams) => Promise<GetListResult<RecordType>>;
    getOne: <RecordType extends Record = Record>(resource: string, params: GetOneParams) => Promise<GetOneResult<RecordType>>;
    getMany: <RecordType extends Record = Record>(resource: string, params: GetManyParams) => Promise<GetManyResult<RecordType>>;
    getManyReference: <RecordType extends Record = Record>(resource: string, params: GetManyReferenceParams) => Promise<GetManyReferenceResult<RecordType>>;
    update: <RecordType extends Record = Record>(resource: string, params: UpdateParams) => Promise<UpdateResult<RecordType>>;
    updateMany: (resource: string, params: UpdateManyParams) => Promise<UpdateManyResult>;
    create: <RecordType extends Record = Record>(resource: string, params: CreateParams) => Promise<CreateResult<RecordType>>;
    delete: <RecordType extends Record = Record>(resource: string, params: DeleteParams) => Promise<DeleteResult<RecordType>>;
    deleteMany: (resource: string, params: DeleteManyParams) => Promise<DeleteManyResult>;
    [key: string]: any;
};
export interface GetListParams {
    pagination: PaginationPayload;
    sort: SortPayload;
    filter: any;
}
export interface GetListResult<RecordType = Record> {
    data: RecordType[];
    total: number;
    validUntil?: ValidUntil;
}
export interface GetOneParams {
    id: Identifier;
}
export interface GetOneResult<RecordType = Record> {
    data: RecordType;
    validUntil?: ValidUntil;
}
export interface GetManyParams {
    ids: Identifier[];
}
export interface GetManyResult<RecordType = Record> {
    data: RecordType[];
    validUntil?: ValidUntil;
}
export interface GetManyReferenceParams {
    target: string;
    id: Identifier;
    pagination: PaginationPayload;
    sort: SortPayload;
    filter: any;
}
export interface GetManyReferenceResult<RecordType = Record> {
    data: RecordType[];
    total: number;
    validUntil?: ValidUntil;
}
export interface UpdateParams {
    id: Identifier;
    data: any;
    previousData: Record;
}
export interface UpdateResult<RecordType = Record> {
    data: RecordType;
    validUntil?: ValidUntil;
}
export interface UpdateManyParams {
    ids: Identifier[];
    data: any;
}
export interface UpdateManyResult {
    data?: Identifier[];
    validUntil?: ValidUntil;
}
export interface CreateParams {
    data: any;
}
export interface CreateResult<RecordType = Record> {
    data: RecordType;
    validUntil?: ValidUntil;
}
export interface DeleteParams {
    id: Identifier;
    previousData: Record;
}
export interface DeleteResult<RecordType = Record> {
    data?: RecordType;
}
export interface DeleteManyParams {
    ids: Identifier[];
}
export interface DeleteManyResult {
    data?: Identifier[];
}
export declare type DataProviderResult<RecordType = Record> = CreateResult<RecordType> | DeleteResult<RecordType> | DeleteManyResult | GetListResult<RecordType> | GetManyResult<RecordType> | GetManyReferenceResult<RecordType> | GetOneResult<RecordType> | UpdateResult<RecordType> | UpdateManyResult;
export declare type DataProviderProxy = {
    getList: <RecordType extends Record = Record>(resource: string, params: GetListParams, options?: UseDataProviderOptions) => Promise<GetListResult<RecordType>>;
    getOne: <RecordType extends Record = Record>(resource: string, params: GetOneParams, options?: UseDataProviderOptions) => Promise<GetOneResult<RecordType>>;
    getMany: <RecordType extends Record = Record>(resource: string, params: GetManyParams, options?: UseDataProviderOptions) => Promise<GetManyResult<RecordType>>;
    getManyReference: <RecordType extends Record = Record>(resource: string, params: GetManyReferenceParams, options?: UseDataProviderOptions) => Promise<GetManyReferenceResult<RecordType>>;
    update: <RecordType extends Record = Record>(resource: string, params: UpdateParams, options?: UseDataProviderOptions) => Promise<UpdateResult<RecordType>>;
    updateMany: (resource: string, params: UpdateManyParams, options?: UseDataProviderOptions) => Promise<UpdateManyResult>;
    create: <RecordType extends Record = Record>(resource: string, params: CreateParams, options?: UseDataProviderOptions) => Promise<CreateResult<RecordType>>;
    delete: <RecordType extends Record = Record>(resource: string, params: DeleteParams, options?: UseDataProviderOptions) => Promise<DeleteResult<RecordType>>;
    deleteMany: (resource: string, params: DeleteManyParams, options?: UseDataProviderOptions) => Promise<DeleteManyResult>;
    [key: string]: any;
};
export declare type MutationMode = 'pessimistic' | 'optimistic' | 'undoable';
export declare type OnSuccess = (response?: any) => void;
export declare type OnFailure = (error?: any) => void;
export interface UseDataProviderOptions {
    action?: string;
    fetch?: string;
    meta?: object;
    undoable?: boolean;
    mutationMode?: MutationMode;
    onSuccess?: OnSuccess;
    onFailure?: OnFailure;
}
export declare type LegacyDataProvider = (type: string, resource: string, params: any) => Promise<any>;
export interface ResourceDefinition {
    readonly name: string;
    readonly options?: any;
    readonly hasList?: boolean;
    readonly hasEdit?: boolean;
    readonly hasShow?: boolean;
    readonly hasCreate?: boolean;
    readonly icon?: any;
}
/**
 * Redux state type
 */
export interface ReduxState {
    admin: {
        ui: {
            automaticRefreshEnabled: boolean;
            optimistic: boolean;
            sidebarOpen: boolean;
            viewVersion: number;
        };
        resources: {
            [name: string]: {
                props: ResourceDefinition;
                data: {
                    [key: string]: Record;
                    [key: number]: Record;
                };
                list: {
                    cachedRequests?: {
                        ids: Identifier[];
                        total: number;
                        validity: Date;
                    };
                    expanded: Identifier[];
                    ids: Identifier[];
                    loadedOnce: boolean;
                    params: any;
                    selectedIds: Identifier[];
                    total: number;
                };
                validity: {
                    [key: string]: Date;
                    [key: number]: Date;
                };
            };
        };
        references: {
            oneToMany: {
                [relatedTo: string]: {
                    ids: Identifier[];
                    total: number;
                };
            };
        };
        loading: number;
        customQueries: {
            [key: string]: any;
        };
    };
    router: {
        location: Location;
    };
    [key: string]: any;
}
export declare type InitialState = object | (() => object);
/**
 * Misc types
 */
export declare type Dispatch<T> = T extends (...args: infer A) => any ? (...args: A) => void : never;
export declare type ResourceElement = ReactElement<ResourceProps>;
export declare type RenderResourcesFunction = (permissions: any) => ResourceElement[] | Promise<ResourceElement[]>;
export declare type AdminChildren = RenderResourcesFunction | ReactNode;
export interface CustomRoute extends RouteProps {
    noLayout?: boolean;
}
export declare type CustomRoutes = Array<ReactElement<CustomRoute>>;
export declare type TitleComponent = string | ReactElement<any>;
export declare type CatchAllComponent = ComponentType<{
    title?: TitleComponent;
}>;
interface LoginComponentProps extends RouteComponentProps {
    title?: TitleComponent;
    theme?: object;
}
export declare type LoginComponent = ComponentType<LoginComponentProps>;
export declare type DashboardComponent = ComponentType<WithPermissionsChildrenParams>;
export interface CoreLayoutProps {
    children?: ReactNode;
    dashboard?: DashboardComponent;
    logout?: ReactNode;
    menu?: ComponentType<{
        logout?: ReactNode;
        hasDashboard?: boolean;
    }>;
    theme?: ThemeOptions;
    title?: TitleComponent;
}
export declare type LayoutComponent = ComponentType<CoreLayoutProps>;
export declare type LoadingComponent = ComponentType<{
    theme?: ThemeOptions;
    loadingPrimary?: string;
    loadingSecondary?: string;
}>;
export interface ResourceComponentInjectedProps {
    basePath?: string;
    permissions?: any;
    resource?: string;
    options?: any;
    hasList?: boolean;
    hasEdit?: boolean;
    hasShow?: boolean;
    hasCreate?: boolean;
}
export interface ResourceComponentProps<Params extends {
    [K in keyof Params]?: string;
} = {}, C extends StaticContext = StaticContext, S = LocationState> extends Partial<RouteComponentProps<Params, C, S>>, ResourceComponentInjectedProps {
}
export declare type ReactAdminComponentProps = ResourceComponentProps;
export interface ResourceComponentPropsWithId<Params extends {
    id?: string;
} = {}, C extends StaticContext = StaticContext, S = LocationState> extends Partial<RouteComponentProps<Params, C, S>>, ResourceComponentInjectedProps {
    id?: string;
}
export declare type ReactAdminComponentPropsWithId = ResourceComponentPropsWithId;
export declare type ResourceMatch = Match<{
    id?: string;
}>;
export interface ResourceProps {
    intent?: 'route' | 'registration';
    match?: ResourceMatch;
    name: string;
    list?: ComponentType<ResourceComponentProps>;
    create?: ComponentType<ResourceComponentProps>;
    edit?: ComponentType<ResourceComponentPropsWithId>;
    show?: ComponentType<ResourceComponentPropsWithId>;
    icon?: ComponentType<any>;
    options?: object;
}
export interface AdminProps {
    appLayout?: LayoutComponent;
    authProvider?: AuthProvider | LegacyAuthProvider;
    catchAll?: CatchAllComponent;
    children?: AdminChildren;
    customReducers?: object;
    customRoutes?: CustomRoutes;
    customSagas?: any[];
    dashboard?: DashboardComponent;
    dataProvider: DataProvider | LegacyDataProvider;
    disableTelemetry?: boolean;
    history?: History;
    i18nProvider?: I18nProvider;
    initialState?: InitialState;
    layout?: LayoutComponent;
    loading?: ComponentType;
    locale?: string;
    loginPage?: LoginComponent | boolean;
    logoutButton?: ComponentType;
    menu?: ComponentType;
    ready?: ComponentType;
    theme?: ThemeOptions;
    title?: TitleComponent;
}
export declare type Exporter = (data: any, fetchRelatedRecords: (data: any, field: string, resource: string) => Promise<any>, dataProvider: DataProvider, resource?: string) => void | Promise<void>;
export declare type SetOnSave = (onSave?: (values: object, redirect: any) => void) => void;
export declare type FormContextValue = {
    setOnSave?: SetOnSave;
    registerGroup: (name: string) => void;
    unregisterGroup: (name: string) => void;
    registerField: (source: string, group?: string) => void;
    unregisterField: (source: string, group?: string) => void;
    getGroupFields: (name: string) => string[];
};
export declare type FormFunctions = {
    setOnSave?: SetOnSave;
};
export {};
