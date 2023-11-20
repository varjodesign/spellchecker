import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

export function authorize(req:Request, res:Response, next:NextFunction) {
    const apiKey = process.env['APIKEY'];
    if (!apiKey) {
        throw Error("APIKEY is not defined")
    }
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.locals.status = "error"
    }
    if (apiKey !== authorization) {
        res.locals.status = "error"
    }
    next();
}