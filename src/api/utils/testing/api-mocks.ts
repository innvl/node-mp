import { Request, Response } from 'express';

export const mockResponse = (): Response => {
    const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    };
    return res as unknown as Response;
};


export const mockRequest = <T>(params?: { [key: string]: unknown }, body?: unknown): Request<any, any, any, any> => {
    const req: any = {};
    req.params = params;
    req.body = body || null;
    return req as Request<any, any, any, any>;
};
