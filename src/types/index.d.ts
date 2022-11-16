import { ServerResponse } from "http";
import { NextIncomingMessage } from "next/dist/server/request-meta";
import { AppTreeType } from "next/dist/shared/lib/utils";
import { ParsedUrlQuery } from "querystring";

export interface NextPageContextCustom {
    /**
     * Error object if encountered during rendering
     */
    err?: (Error & {
        statusCode?: number;
    }) | null;
    /**
     * `HTTP` request object.
     */
    req?: NextIncomingMessage;
    /**
     * `HTTP` response object.
     */
    res?: ServerResponse;
    /**
     * Path section of `URL`.
     */
    pathname: string;
    /**
     * Query string section of `URL` parsed as an object.
     */
    query: ParsedUrlQuery;
    /**
     * `String` of the actual path including query.
     */
    asPath?: string;
    /**
     * The currently active locale
     */
    locale?: string;
    /**
     * All configured locales
     */
    locales?: string[];
    /**
     * The configured default locale
     */
    defaultLocale?: string;
     /**
     * Custom  props at auth level
      */
    auth?:boolean;
    /**
     * `Component` the tree of the App to use if needing to render separately
     */
    AppTree: AppTreeType;

  
}


