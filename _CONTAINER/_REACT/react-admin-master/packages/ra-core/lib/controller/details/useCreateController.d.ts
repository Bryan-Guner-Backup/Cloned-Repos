import { MutableRefObject } from 'react';
import { Location } from 'history';
import { match as Match } from 'react-router-dom';
import { RedirectionSideEffect } from '../../sideEffect';
import { SetOnSuccess, SetOnFailure, TransformData, SetTransformData } from '../saveModifiers';
import { Record, OnSuccess, OnFailure } from '../../types';
export interface CreateProps<RecordType extends Omit<Record, 'id'> = Record> {
    basePath?: string;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    location?: Location;
    match?: Match;
    record?: Partial<RecordType>;
    resource?: string;
    onSuccess?: OnSuccess;
    onFailure?: OnFailure;
    transform?: TransformData;
    successMessage?: string;
}
export interface CreateControllerProps<RecordType extends Omit<Record, 'id'> = Record> {
    basePath?: string;
    data?: RecordType;
    defaultTitle: string;
    loading: boolean;
    loaded: boolean;
    hasCreate?: boolean;
    hasEdit?: boolean;
    hasList?: boolean;
    hasShow?: boolean;
    onSuccessRef: MutableRefObject<OnSuccess>;
    onFailureRef: MutableRefObject<OnFailure>;
    transformRef: MutableRefObject<TransformData>;
    save: (record: Partial<Record>, redirect: RedirectionSideEffect, callbacks?: {
        onSuccess?: OnSuccess;
        onFailure?: OnFailure;
        transform?: TransformData;
    }) => void;
    saving: boolean;
    setOnSuccess: SetOnSuccess;
    setOnFailure: SetOnFailure;
    setTransform: SetTransformData;
    successMessage?: string;
    record?: Partial<RecordType>;
    redirect: RedirectionSideEffect;
    resource: string;
    version: number;
}
/**
 * Prepare data for the Create view
 *
 * @param {Object} props The props passed to the Create component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Create view
 *
 * @example
 *
 * import { useCreateController } from 'react-admin';
 * import CreateView from './CreateView';
 *
 * const MyCreate = props => {
 *     const controllerProps = useCreateController(props);
 *     return <CreateView {...controllerProps} {...props} />;
 * }
 */
export declare const useCreateController: <RecordType extends Pick<Record, import("../../types").Identifier> = Record>(props: CreateProps) => CreateControllerProps<RecordType>;
export declare const getRecord: ({ state, search }: {
    state: any;
    search: any;
}, record?: any) => any;
