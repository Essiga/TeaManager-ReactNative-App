/* tslint:disable */
/* eslint-disable */
/**
 * Tea Manager
 * A tea manager to manage teas, YES!
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface Session
 */
export interface Session {
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    'teaId': string;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    'teaName'?: string;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    'date': string;
    /**
     * 
     * @type {number}
     * @memberof Session
     */
    'amount': number;
    /**
     * 
     * @type {number}
     * @memberof Session
     */
    'price'?: number;
    /**
     * 
     * @type {string}
     * @memberof Session
     */
    'vesselId': string;
}
/**
 * 
 * @export
 * @interface Tea
 */
export interface Tea {
    /**
     * 
     * @type {string}
     * @memberof Tea
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof Tea
     */
    'name': string;
    /**
     * 
     * @type {TeaType}
     * @memberof Tea
     */
    'type': TeaType;
    /**
     * 
     * @type {number}
     * @memberof Tea
     */
    'price'?: number;
    /**
     * 
     * @type {number}
     * @memberof Tea
     */
    'amount': number;
    /**
     * 
     * @type {string}
     * @memberof Tea
     */
    'link'?: string;
    /**
     * 
     * @type {string}
     * @memberof Tea
     */
    'vendor'?: string;
    /**
     * 
     * @type {number}
     * @memberof Tea
     */
    'year'?: number;
}
/**
 * 
 * @export
 * @enum {string}
 */

export const TeaType = {
    Green: 'Green',
    Black: 'Black',
    Oolong: 'Oolong',
    Sheng: 'Sheng',
    Shou: 'Shou',
    Yellow: 'Yellow',
    White: 'White',
    Heicha: 'Heicha'
} as const;

export type TeaType = typeof TeaType[keyof typeof TeaType];


/**
 * 
 * @export
 * @interface Vessel
 */
export interface Vessel {
    /**
     * 
     * @type {string}
     * @memberof Vessel
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof Vessel
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof Vessel
     */
    'capacity': number;
}

/**
 * SessionApi - axios parameter creator
 * @export
 */
export const SessionApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Add a new session.
         * @param {Session} session 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addSession: async (session: Session, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'session' is not null or undefined
            assertParamExists('addSession', 'session', session)
            const localVarPath = `/addSession`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(session, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get all sessions.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewAllSessions: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/viewAllSessions`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SessionApi - functional programming interface
 * @export
 */
export const SessionApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SessionApiAxiosParamCreator(configuration)
    return {
        /**
         * Add a new session.
         * @param {Session} session 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addSession(session: Session, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addSession(session, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get all sessions.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewAllSessions(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Session>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.viewAllSessions(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SessionApi - factory interface
 * @export
 */
export const SessionApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SessionApiFp(configuration)
    return {
        /**
         * Add a new session.
         * @param {Session} session 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addSession(session: Session, options?: any): AxiosPromise<string> {
            return localVarFp.addSession(session, options).then((request) => request(axios, basePath));
        },
        /**
         * Get all sessions.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewAllSessions(options?: any): AxiosPromise<Array<Session>> {
            return localVarFp.viewAllSessions(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SessionApi - object-oriented interface
 * @export
 * @class SessionApi
 * @extends {BaseAPI}
 */
export class SessionApi extends BaseAPI {
    /**
     * Add a new session.
     * @param {Session} session 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SessionApi
     */
    public addSession(session: Session, options?: AxiosRequestConfig) {
        return SessionApiFp(this.configuration).addSession(session, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get all sessions.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SessionApi
     */
    public viewAllSessions(options?: AxiosRequestConfig) {
        return SessionApiFp(this.configuration).viewAllSessions(options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * TeaApi - axios parameter creator
 * @export
 */
export const TeaApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Add a new tea.
         * @param {Tea} tea 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTea: async (tea: Tea, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tea' is not null or undefined
            assertParamExists('addTea', 'tea', tea)
            const localVarPath = `/addTea`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(tea, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Update tea.
         * @param {Tea} tea 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTea: async (tea: Tea, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tea' is not null or undefined
            assertParamExists('updateTea', 'tea', tea)
            const localVarPath = `/updateTea`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(tea, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get all teas.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewAllTeas: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/viewAllTeas`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TeaApi - functional programming interface
 * @export
 */
export const TeaApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = TeaApiAxiosParamCreator(configuration)
    return {
        /**
         * Add a new tea.
         * @param {Tea} tea 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addTea(tea: Tea, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addTea(tea, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Update tea.
         * @param {Tea} tea 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateTea(tea: Tea, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateTea(tea, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get all teas.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewAllTeas(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Tea>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.viewAllTeas(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * TeaApi - factory interface
 * @export
 */
export const TeaApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = TeaApiFp(configuration)
    return {
        /**
         * Add a new tea.
         * @param {Tea} tea 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTea(tea: Tea, options?: any): AxiosPromise<string> {
            return localVarFp.addTea(tea, options).then((request) => request(axios, basePath));
        },
        /**
         * Update tea.
         * @param {Tea} tea 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTea(tea: Tea, options?: any): AxiosPromise<string> {
            return localVarFp.updateTea(tea, options).then((request) => request(axios, basePath));
        },
        /**
         * Get all teas.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewAllTeas(options?: any): AxiosPromise<Array<Tea>> {
            return localVarFp.viewAllTeas(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TeaApi - object-oriented interface
 * @export
 * @class TeaApi
 * @extends {BaseAPI}
 */
export class TeaApi extends BaseAPI {
    /**
     * Add a new tea.
     * @param {Tea} tea 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TeaApi
     */
    public addTea(tea: Tea, options?: AxiosRequestConfig) {
        return TeaApiFp(this.configuration).addTea(tea, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update tea.
     * @param {Tea} tea 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TeaApi
     */
    public updateTea(tea: Tea, options?: AxiosRequestConfig) {
        return TeaApiFp(this.configuration).updateTea(tea, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get all teas.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TeaApi
     */
    public viewAllTeas(options?: AxiosRequestConfig) {
        return TeaApiFp(this.configuration).viewAllTeas(options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * VesselApi - axios parameter creator
 * @export
 */
export const VesselApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Add a new vessel.
         * @param {Vessel} vessel 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addVessel: async (vessel: Vessel, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'vessel' is not null or undefined
            assertParamExists('addVessel', 'vessel', vessel)
            const localVarPath = `/addVessel`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(vessel, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete vessel.
         * @param {string} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteVessel: async (body: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('deleteVessel', 'body', body)
            const localVarPath = `/deleteVessel`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'text/plain';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Get all vessels.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewAllVessels: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/viewAllVessels`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * VesselApi - functional programming interface
 * @export
 */
export const VesselApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = VesselApiAxiosParamCreator(configuration)
    return {
        /**
         * Add a new vessel.
         * @param {Vessel} vessel 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addVessel(vessel: Vessel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.addVessel(vessel, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Delete vessel.
         * @param {string} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteVessel(body: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteVessel(body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Get all vessels.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async viewAllVessels(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Vessel>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.viewAllVessels(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * VesselApi - factory interface
 * @export
 */
export const VesselApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = VesselApiFp(configuration)
    return {
        /**
         * Add a new vessel.
         * @param {Vessel} vessel 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addVessel(vessel: Vessel, options?: any): AxiosPromise<string> {
            return localVarFp.addVessel(vessel, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete vessel.
         * @param {string} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteVessel(body: string, options?: any): AxiosPromise<string> {
            return localVarFp.deleteVessel(body, options).then((request) => request(axios, basePath));
        },
        /**
         * Get all vessels.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        viewAllVessels(options?: any): AxiosPromise<Array<Vessel>> {
            return localVarFp.viewAllVessels(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * VesselApi - object-oriented interface
 * @export
 * @class VesselApi
 * @extends {BaseAPI}
 */
export class VesselApi extends BaseAPI {
    /**
     * Add a new vessel.
     * @param {Vessel} vessel 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VesselApi
     */
    public addVessel(vessel: Vessel, options?: AxiosRequestConfig) {
        return VesselApiFp(this.configuration).addVessel(vessel, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete vessel.
     * @param {string} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VesselApi
     */
    public deleteVessel(body: string, options?: AxiosRequestConfig) {
        return VesselApiFp(this.configuration).deleteVessel(body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get all vessels.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VesselApi
     */
    public viewAllVessels(options?: AxiosRequestConfig) {
        return VesselApiFp(this.configuration).viewAllVessels(options).then((request) => request(this.axios, this.basePath));
    }
}


