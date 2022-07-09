import { Request } from 'express'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export type RequestWithBody<TBody = {}> = Request<{}, {}, TBody, {}, {}>

export type RequestWithQuery<TQuery = Query> = Request<{}, {}, {}, TQuery, {}>

export type RequestWithParams<TParams = ParamsDictionary> = Request<TParams, {}, {}, {}, {}>
