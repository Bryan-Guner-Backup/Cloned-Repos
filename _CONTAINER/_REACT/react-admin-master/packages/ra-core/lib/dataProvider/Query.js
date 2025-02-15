"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var useQuery_1 = __importDefault(require("./useQuery"));
/**
 * Fetch the data provider and pass the result to a child function
 *
 * @param {Function} children Must be a function which will be called with an object containing the following keys: data, loading and error
 * @param {string} type The method called on the data provider, e.g. 'getList', 'getOne'. Can also be a custom method if the dataProvider supports is.
 * @param {string} resource A resource name, e.g. 'posts', 'comments'
 * @param {Object} payload The payload object, e.g; { post_id: 12 }
 * @param {Object} options
 * @param {string} options.action Redux action type
 * @param {Function} options.onSuccess Side effect function to be executed upon success or failure, e.g. { onSuccess: response => refresh() }
 * @param {Function} options.onFailure Side effect function to be executed upon failure, e.g. { onFailure: error => notify(error.message) }
 *
 * This component also supports legacy side effects (e.g. { onSuccess: { refresh: true } })
 *
 * @example
 *
 * const UserProfile = ({ record }) => (
 *     <Query type="getOne" resource="users" payload={{ id: record.id }}>
 *         {({ data, loading, error }) => {
 *             if (loading) { return <Loading />; }
 *             if (error) { return <p>ERROR</p>; }
 *             return <div>User {data.username}</div>;
 *         }}
 *     </Query>
 * );
 *
 * @example
 *
 * const payload = {
 *    pagination: { page: 1, perPage: 10 },
 *    sort: { field: 'username', order: 'ASC' },
 * };
 * const UserList = () => (
 *     <Query type="getList" resource="users" payload={payload}>
 *         {({ data, total, loading, error }) => {
 *             if (loading) { return <Loading />; }
 *             if (error) { return <p>ERROR</p>; }
 *             return (
 *                 <div>
 *                     <p>Total users: {total}</p>
 *                     <ul>
 *                         {data.map(user => <li key={user.username}>{user.username}</li>)}
 *                     </ul>
 *                 </div>
 *             );
 *         }}
 *     </Query>
 * );
 */
var Query = function (_a) {
    var children = _a.children, type = _a.type, resource = _a.resource, payload = _a.payload, 
    // Provides an undefined onSuccess just so the key `onSuccess` is defined
    // This is used to detect options in useDataProvider
    _b = _a.options, 
    // Provides an undefined onSuccess just so the key `onSuccess` is defined
    // This is used to detect options in useDataProvider
    options = _b === void 0 ? { onSuccess: undefined } : _b;
    return children(useQuery_1.default({ type: type, resource: resource, payload: payload }, __assign(__assign({}, options), { withDeclarativeSideEffectsSupport: true })));
};
exports.default = Query;
